import makeUp from "./app";
import db from "./database";

const app = makeUp(db);

app.listen(8000);
