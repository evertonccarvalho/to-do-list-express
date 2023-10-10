const express = require("express");
const checklistDependetRouter = express.Router();

const simpleRouter = express.Router();

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

simpleRouter.delete("/:id", async (req, res) => {
  try {
    let task = await Task.findByIdAndDelete(req.params.id);

    let checklist = await Checklist.findById(task.checklist);
    let taskToRemove = checklist.tasks.indexOf(task._id);
    checklist.tasks.splice(taskToRemove, 1);
    checklist.save();
    res.redirect(`/checklists/${checklist._id}`);
  } catch (error) {
    res
      .status(422)
      .render("pages/error", { error: "Erro ao remover uma tarefa" });
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
    let erros = error.erros;
    res.status(422).render("tasks/new", {
      task: { ...task, erros },
      checklistId: req.params.id,
    });
  }
});

simpleRouter.put("/:id", async (req, res) => {
  let task = await Task.findById(req.params.id);
  try {
    task.set(req.body.task);
    await task.save();
    res.status(200).json({ task });
  } catch (error) {
    let errors = error.errors;
    res.status(422).json({ task: { ...errors } });
  }
});

module.exports = {
  checklistDependet: checklistDependetRouter,
  simple: simpleRouter,
};