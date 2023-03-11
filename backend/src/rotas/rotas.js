const { Router } = require("express");
const {
  retornarTodasTarefas,
  retornarUmaTarefa,
  criarTarefa,
  deletarTarefa,
  atualizarTarefa,
} = require("../controllers/controllers");

const router = Router();

router.get("/tarefas", retornarTodasTarefas);

router.get("/tarefas/:id", retornarUmaTarefa);

router.post("/tarefas", criarTarefa);

router.delete("/tarefas/:id", deletarTarefa);

router.put("/tarefas/:id", atualizarTarefa);

module.exports = router;
