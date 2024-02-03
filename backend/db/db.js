import pg from "pg";

// connect to Neon Database
const pool = new pg.Pool({
  ssl: {
    require: true,
  },
});

export default pool;
