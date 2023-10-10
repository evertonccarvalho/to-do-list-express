const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();

const checklistsRouter = require("./src/routes/checklist");
const taskRouter = require("./src/routes/task");
const rootRouter = require("./src/routes/index");
const methodOverride = require("method-override");

const connectDB = require("./config/database");
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use("/", rootRouter);
app.use("/checklists", checklistsRouter);
app.use("/checklists", taskRouter.checklistDependet);
app.use("/tasks", taskRouter.simple);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
