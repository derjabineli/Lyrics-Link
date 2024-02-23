const express = require("express");
const expressSession = require("express-session");
const postgresSession = require("connect-pg-simple");
const dotenv = require("dotenv");
const cors = require("cors");
const pool = require("../db/db.js");
const {
  getPCCredentials,
  getSong,
  getSongs,
  getUser,
} = require("../utils/planningcenter.js");

dotenv.config();

const FRONTENDURL = process.env.FRONTENDURL;
const app = express();

// Takes information from a request body and attaches it to request object
const corsOptions = {
  origin: "lyrics-link.vercel.app",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());

// Set Postgres Session
const pgSession = postgresSession(expressSession);
app.use(
  expressSession({
    store: new pgSession({
      pool: pool, // Connection pool
      tableName: "user_sessions", // Use another table-name than the default "session" one
      // Insert connect-pg-simple options here
    }),
    secret: process.env.FOO_COOKIE_SECRET,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: false }, // 1 day
  })
);

app.get("/api", async (req, res) => {
  if (req.session.access_token) {
    res.send("logged in");
  } else res.send("not logged in");
});

// Log in
app.get("/api/login", async (req, res) => {
  res.redirect(
    `https://api.planningcenteronline.com/oauth/authorize?client_id=${process.env.PCCLIENTID}&redirect_uri=${process.env.REDIRECTURI}&response_type=code&scope=services people`
  );
});

app.get("/api/logout", (req, res) => {
  req.session.destroy();
  res.redirect(FRONTENDURL);
});

app.get("/api/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) {
    res.redirect("/api/login");
  }
  const accessData = await getPCCredentials(code);
  req.session.access_token = accessData.access_token;
  req.session.token_type = accessData.token_type;
  req.session.expires_in = accessData.expires_in;
  req.session.refresh_token = accessData.refresh_token;
  req.session.scope = accessData.scope;
  req.session.created_at = accessData.created_at;

  const user = await getUser(req.session.access_token);

  req.session.user_id = user.data.id;

  const queryStatus = await pool.query({
    text: "INSERT INTO users (id, name, photo_url) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET name = $2, photo_url = $3",
    values: [
      user.data.id,
      user.data.attributes.full_name,
      user.data.attributes.photo_url,
    ],
  });

  req.session.save(() => {
    res.redirect("http://localhost:3000");
  });
});

app.get("/api/user", async (req, res) => {
  try {
    const user = await getUser(req.session.access_token);
    res.send(user);
  } catch {
    res.send(null);
  }
});

app.get("/api/event", async (req, res) => {
  const { id } = req.query;

  const event = await pool.query({
    text: "SELECT * FROM events WHERE id = $1",
    values: [id],
  });
  res.send(event);
});

app.get("/api/events", async (req, res) => {
  try {
    const events = await pool.query({
      text: "SELECT * FROM events WHERE user_id = $1",
      values: [req.session.user_id],
    });
    res.send(events.rows);
  } catch (error) {}
});

app.post("/api/events", async (req, res) => {
  let event_id;
  if (req.body.id === undefined) {
    event_id = Math.random().toString(20).substring(2, 10);
  } else {
    event_id = req.body.id;
  }
  const { name, date, songs } = req.body;
  const user_id = req.session.user_id;

  try {
    const events = await pool.query({
      text: "INSERT INTO events (id, event_type, event_date, songs, user_id) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO UPDATE SET event_type = $2, event_date = $3, songs = $4",
      values: [event_id, name, date, songs, user_id],
    });
    res.redirect(FRONTENDURL);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/songs", async (req, res) => {
  const search = req.query.search;
  const data = await getSongs(req.session.access_token, search);
  res.send(data);
});

app.get("/api/song", async (req, res) => {
  const id = req.query.id;
  const data = await getSong(req.session.access_token, id);
  res.send(await data);
});

app.post("/api/song", async (req, res) => {
  const { id, name, lyrics, chord_chart, chord_chart_key } = req.body;

  try {
    const events = await pool.query({
      text: "INSERT INTO event_songs (id, name, lyrics, chord_chart, chord_chart_key) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO UPDATE SET name = $2, lyrics = $3, chord_chart = $4, chord_chart_key = $5",
      values: [id, name, lyrics, chord_chart, chord_chart_key],
    });
    res.send(events);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/getSong", async (req, res) => {
  const id = req.query.id;

  try {
    const lyrics = await pool.query({
      text: "SELECT lyrics, name FROM event_songs WHERE id = $1;",
      values: [id],
    });
    res.send(lyrics.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3001, () => {
  console.log("server listening on port 3001");
});

module.exports = app;