const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

//END POINTS
const Rotas = require("./rotas/rotas");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(Rotas);

app.use((err, req, res, next) => {
  return res.json({
    mensagem: "erro!!",
  });
});

app.listen(8080);
console.log("Server Rodando na Porta 8080");
