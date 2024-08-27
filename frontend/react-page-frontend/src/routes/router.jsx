import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { Home } from "../pages/home/home.jsx";
import { Sobre } from "../pages/sobre/sobre.jsx";
import { Tecnologias } from "../pages/tecnologias/tecnologias.jsx";
import { Servicos } from "../pages/servicos/servicos.jsx";
import { Contato } from "../pages/contato/contato.jsx";
import { Login } from "../pages/login/login.jsx";
import { Registrar } from "../pages/login/registrar.jsx";
import { ForgotPassword } from "../pages/login/forgot-password.jsx";
import { ResetPassword } from "../pages/login/reset-password.jsx";
import { ContatoCrud } from "../crud/contato-crud.jsx";
import { LoginCrud } from "../crud/login-crud.jsx";
import { Reuniao } from "../pages/reuniao/reuniao.jsx"
import { ReuniaoCrud } from "../crud/reuniao-crud.jsx"

export function Router() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        document.title = 'Home | Magic';
        break;
      case '/sobre':
        document.title = 'Sobre | Magic';
        break;
      case '/tecnologias':
        document.title = 'Tecnologias | Magic';
        break;
      case '/servicos':
        document.title = 'Serviços | Magic';
        break;
      case '/contato':
        document.title = 'Contato | Magic';
        break;
      case '/login':
        document.title = 'Login | Magic';
        break;
      case '/registrar':
        document.title = 'Registrar | Magic';
        break;
      case '/forgot-password':
        document.title = 'Recuperar Senha | Magic';
        break;
      case `/reset-password/${location.pathname.split("/")[2]}`:
        document.title = 'Redefinir Senha | Magic';
        break;
      case '/contato-crud':
        document.title = 'Contato CRUD | Magic';
        break;
      case '/login-crud':
        document.title = 'Login CRUD | Magic';
        break;
      case '/reuniao':
        document.title = 'Reunião | Magic';
        break;
      case '/reuniao-crud':
        document.title = 'Reunião CRUD | Magic';
        break;
      default:
        document.title = 'Magic';
        break;
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/tecnologias" element={<Tecnologias />} />
      <Route path="/servicos" element={<Servicos />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrar" element={<Registrar />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:userid/:token" element={<ResetPassword />} />
      <Route path="/contato-crud" element={<ContatoCrud />} />
      <Route path="/login-crud" element={<LoginCrud />} />
      <Route path="/reuniao" element={<Reuniao/>}/>
      <Route path="/reuniao-crud" element={<ReuniaoCrud/>}/>
    </Routes>
  );
}