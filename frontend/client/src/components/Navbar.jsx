import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Container>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                <Link style={{ textDecoration: "none", color: "#eee" }} to="/">
                  Sistema de Cadastro
                </Link>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/tarefas/nova")}
              >
                Adicionar Cadastro
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </div>
  );
}

export default Navbar;
