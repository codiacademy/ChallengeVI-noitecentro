import { Route, Routes } from "react-router-dom";

import { Home } from "../pages/home/home.jsx";
import { Sobre } from "../pages/sobre/sobre.jsx";
import { Tecnologias } from "../pages/tecnologias/tecnologias.jsx";
import { Servicos } from "../pages/servicos/servicos.jsx";
import { Contato } from "../pages/contato/contato.jsx";
import { Login } from "../pages/login/login.jsx";
import { Registrar } from "../pages/login/registrar.jsx";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/tecnologias" element={<Tecnologias />} />
      <Route path="/servicos" element={<Servicos />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrar" element={<Registrar />} />
    </Routes>
  );
}