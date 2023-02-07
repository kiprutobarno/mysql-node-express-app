import express from "express";
import { getNotes, getNote, createNote } from "./database";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/notes", async (req, res) => {
  const { title, contents } = req.body;

  try {
    const response = await createNote(title, contents);
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.sqlMessage });
    return;
  }
});

app.get("/notes", async (req, res) => {
  try {
    const notes = await getNotes();
    res.send({ notes });
  } catch (error) {
    res.status(500).send({ message: error.sqlMessage });
    return;
  }
});

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const note = await getNote(id);
    res.send({ note });
  } catch (error) {
    res.status(500).send({ message: error.sqlMessage });
    return;
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
