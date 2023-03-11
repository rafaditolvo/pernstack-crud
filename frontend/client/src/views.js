import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaTarefas from "./components/ListaTarefas";
import FormsTarefas from "./components/FormsTarefas";
import Navbar from "./components/Navbar";
import Menu from "./components/Navbar";
import { Container } from "@mui/material";
function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route path="/" element={<ListaTarefas />} />
          <Route path="/tarefas/nova" element={<FormsTarefas />} />
          <Route path="/tarefas/:id/edit/" element={<FormsTarefas />} />
          {/*edit routes*/}
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
