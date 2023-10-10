const express = require("express");
const Checklist = require("../models/checklist");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let checklists = await Checklist.find({});
    res.status(200).render("checklists/index", { checklists: checklists });
  } catch (error) {
    res
      .status(200)
      .render("pages/error", { error: "Erro ao exibir as Listas" });
  }
});

router.get("/new", (req, res) => {
  try {
    let checklist = new Checklist();
    res.status(200).render("checklists/new", { checklist: checklist });
  } catch {
    res
      .status(500)
      .render("pages/error", { error: "Erro ao carregar o formulário" });
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    console.log("Checklist encontrado:", checklist); // Adicione esta linha
    res.status(200).render("checklists/edit", { checklist: checklist });
  } catch (error) {
    console.error("Erro ao buscar o checklist:", error); // Adicione esta linha
    res.status(500).render("pages/error", {
      error: "Erro ao exibir a edição das Listas de tarefas",
    });
  }
});

router.post("/", async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = new Checklist({ name });

  try {
    await checklist.save();
    res.redirect("/checklists");
  } catch (error) {
    res
      .status(422)
      .render("checklists/new", { checklist: { ...checklist, error } });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id).populate("tasks");
    res.status(200).render("checklists/show", { checklist: checklist });
  } catch (error) {
    res
      .status(200)
      .render("pages/error", { error: "Erro ao exibir as Listas de tarefas" });
  }
});

router.put("/:id", async (req, res) => {
  const { name } = req.body.checklist;
  try {
    const updatedChecklist = await Checklist.findOneAndUpdate(
      { _id: req.params.id },
      { name },
      { new: true } // Para retornar o documento atualizado
    );

    if (!updatedChecklist) {
      return res.status(404).send("Checklist não encontrado");
    }

    res.redirect("/checklists");
  } catch (error) {
    console.error("Erro ao atualizar o checklist:", error);
    const erros = error.message; // Use error.message para obter a mensagem de erro
    res.status(422).render("checklists/edit", {
      checklist: { ...req.body.checklist, erros },
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findByIdAndRemove(req.params.id);
    res.redirect("/checklists");
  } catch (error) {
    res.status(500).render("pages/error", {
      error: "Erro ao deletar a Listas de tarefas",
    });
  }
});

module.exports = router;
