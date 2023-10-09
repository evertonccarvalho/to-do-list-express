const express = require("express");
const app = express();
const path = require("path");

const checklistsRouter = require("./src/routes/checklist");
const rootRouter = require("./src/routes/index");
const methodOverride = require("method-override");

require("./config/database");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use("/", rootRouter);
app.use("/checklists", checklistsRouter);

app.listen(3000, () => {
  console.log("Servido foi Iniciado");
});
