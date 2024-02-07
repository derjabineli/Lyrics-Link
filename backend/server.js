import express from "express";
import expressSession from "express-session";
import postgresSession from "connect-pg-simple";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
import pool from "./db/db.js";
import { getPCCredentials, getSongs, getUser } from "./utils/planningcenter.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// Takes information from a request body and attaches it to request object
app.use(cors());
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

app.get("/", async (req, res) => {
  if (req.session.access_token) {
    res.send("logged in");
  } else res.send("not logged in");
});

// Log in
app.get("/login", async (req, res) => {
  res.redirect(
    `https://api.planningcenteronline.com/oauth/authorize?client_id=${process.env.PCCLIENTID}&redirect_uri=${process.env.REDIRECTURI}&response_type=code&scope=services people`
  );
});

app.get("/callback", async (req, res) => {
  console.log(req.query.code);
  const code = req.query.code;
  if (!code) {
    res.redirect("/login");
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

  pool.query({
    text: "INSERT INTO users (id, name, photo_url) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET name = $2, photo_url = $3",
    values: [
      user.data.id,
      user.data.attributes.full_name,
      user.data.attributes.photo_url,
    ],
  });

  res.redirect("http://localhost:3000");
});

app.get("/api/logout", (req, res) => {
  req.session.destroy();
  res.redirect("http://localhost:3000/");
});

app.get("/api/user", async (req, res) => {
  try {
    const user = await getUser(req.session.access_token);
    res.send(user);
  } catch {
    res.send(null);
  }
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

app.post("/api/addSong", async (req, res) => {
  const { id, title, admin, author, ccli, copyright, links } = req.body;

  console.log(req.body.id);
  // pool.query(
  //   "INSERT INTO songs (id, title, admin, author, ccli, copyright, links) VALUES (5312796, '10,000 Reasons (Bless The Lord)', 'EMI Christian Music Publishing', 'EMI Christian Music Publishing', 6016351, '2011 Thankyou Music, Said And Done Music, sixsteps Music, and SHOUT! Publishing', 'https://api.planningcenteronline.com/services/v2/songs/5312796')"
  // );
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
