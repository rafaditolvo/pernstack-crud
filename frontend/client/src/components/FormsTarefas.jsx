import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const TaskForm = () => {
  const [tarefas, setTarefas] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      CarregarTarefas(params.id);
    }
  }, [params.id]);

  const CarregarTarefas = async (id) => {
    const res = await fetch("http://localhost:8080/tarefas/" + id);
    const data = await res.json();
    setTarefas({ title: data.title, description: data.description });
    setEditing(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        const response = await fetch(
          "http://localhost:8080/tarefas/" + params.id,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tarefas),
          }
        );
        await response.json();
      } else {
        const response = await fetch("http://localhost:8080/tarefas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tarefas),
        });
        await response.json();
      }

      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) =>
    setTarefas({ ...tarefas, [e.target.name]: e.target.value });

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: "#1E272E",
            padding: "1rem",
          }}
        >
          <Typography variant="h5" textAlign="center" color="white">
            {editing ? "Gerar Cadastro" : "Gerar Cadastro"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Nome"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="title"
                onChange={handleChange}
                value={tarefas.title}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="outlined"
                label="Idade"
                multiline
                rows={4}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="description"
                onChange={handleChange}
                value={tarefas.description}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!tarefas.title || !tarefas.description}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={25} />
                ) : (
                  "Salvar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TaskForm;
