const pool = require("../db");

const retornarTodasTarefas = async (req, res, next) => {
  try {
    const todasTarefas = await pool.query("SELECT * FROM tarefas");
    res.json(todasTarefas);
  } catch (error) {
    next(error);
  }
};

const retornarUmaTarefa = async (req, res, next) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query("SELECT * FROM tarefas WHERE id = $1", [
      id,
    ]);
    if (resultado.rows.length === 0)
      return res.status(404).json({
        message: "tarefa não encontrada",
      });
    res.json(resultado.rows[0]);
  } catch (error) {
    next(error);
  }
};

const criarTarefa = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const resultado = await pool.query(
      "INSERT INTO tarefas (title, description) VALUES ($1,$2) RETURNING *",
      [title, description]
    );
    console.log(resultado);
    res.json(resultado.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deletarTarefa = async (req, res, next) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query("DELETE FROM tarefas WHERE id = $1", [
      id,
    ]);
    if (resultado.rowCount === 0)
      return res.status(404).json({
        mensagem: "Tarefa não Encontrada",
      });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const atualizarTarefa = async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const resultado = await pool.query(
      "UPDATE tarefas SET title = $1, description = $2 WHERE id = $3 RETURNING * ",
      [title, description, id]
    );

    if (resultado.rows.length === 0)
      return res.status(404).json({
        mensagem: "Tarefa não Encontrada",
      });
    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  retornarTodasTarefas,
  retornarUmaTarefa,
  criarTarefa,
  deletarTarefa,
  atualizarTarefa,
};
