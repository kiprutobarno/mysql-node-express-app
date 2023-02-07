import dotenv from "dotenv/config";
import makeUp from "./app";
import db from "./database";

const app = makeUp(db);

app.listen(process.env.PORT);
