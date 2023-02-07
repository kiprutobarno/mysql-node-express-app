import dotenv from "dotenv/config";
import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
  })
  .promise();

const getNotes = async () => {
  const [rows] = await pool.query("SELECT * FROM notes");
  return rows;
};babel-node

const getNote = async (id) => {
  const [row] = await pool.query("SELECT * FROM notes WHERE id = ?", [id]);
  return row[0];
};

const createNote = async (title, content) => {
  const [result] = await pool.query(
    "INSERT INTO notes(title, contents) VALUES(?, ?) ",
    [title, content]
  );
  const id = result.insertId;
  return getNote(id);
};

const db = { createNote, getNote, getNotes };

export default db;
