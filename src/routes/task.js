const express = require("express");
const checklistDependetRouter = express.Router();

const Checklist = require("../models/checklist");
const Task = require("../models/task");

checklistDependetRouter.get("/:id/tasks/new", async (req, res) => {
  try {
    let task = Task();
    res
      .status(200)
      .render("tasks/new", { checklistId: req.params.id, task: task });
  } catch (error) {
    res
      .status(422)
      .render("pages/error", { erros: "Erro ao Carragar o formulário" });
  }
});

checklistDependetRouter.post("/:id/tasks", async (req, res) => {
  let { name } = req.body.task;
  let task = new Task({ name, checklist: req.params.id });
  try {
    await task.save();
    let checklist = await Checklist.findById(req.params.id);
    checklist.tasks.push(task);
    await checklist.save();
    res.redirect(`/checklists/${req.params.id}`);
  } catch (error) {
    let erros = erro.erros;
    res.status(422).render("tasks/new", {
      task: { ...task, erros },
      checklistId: req.params.id,
    });
  }
});

module.exports = { checklistDependet: checklistDependetRouter };
