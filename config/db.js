import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Builds connection to DB
pool.connect()
  .then((client) => {
    console.log("PostgreSQL Connected Successfully");
    client.release();
  })
  .catch((err) => {
    console.error(" Database Connection Failed");
    console.error(err.message);
  });

export default pool;