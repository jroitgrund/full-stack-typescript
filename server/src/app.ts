import * as debugFactory from "debug";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";

const app = express();
const debug = debugFactory("server");

app.use(logger("dev"));

app.get("/api/hw", (req, res) => {
  res.send("Hello World!");
});

app.use(express.static(path.join(__dirname, "../../../web/dist/")));

app.listen(3000, () => {
  debug("Listening on 3000");
});
