import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container, Card, CardContent } from "@mui/material";

import { useNavigate, Link } from "react-router-dom";

function ListaTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const navigate = useNavigate();

  const CarregarTarefas = async () => {
    const response = await fetch("http://localhost:8080/tarefas");
    const dados = await response.json();
    setTarefas(dados.rows);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/tarefas/${id}`, {
        method: "DELETE",
      });
      setTarefas(tarefas.filter((tarefas) => tarefas.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    CarregarTarefas();
  }, []);

  return (
    <>
      <h1>Lista de Clientes</h1>
      {tarefas.map((tarefas) => (
        <Card
          style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                color: "white",
              }}
            >
              <Typography>{tarefas.title}</Typography>
              <Typography>{tarefas.description}</Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/tarefas/${tarefas.id}/edit`)}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(tarefas.id)}
                style={{ marginLeft: ".5rem" }}
              >
                Deletar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default ListaTarefas;
