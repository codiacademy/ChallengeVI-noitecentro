import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login/login";
import { Registrar } from "../pages/login/registrar";

export function Router() {
  return (
    <Routes>
      {/* <Route path="/" element={<Homepage />} /> */}
      <Route path="/" element={<Login />} />
      <Route path="/registrar" element={<Registrar />} />
    </Routes>
  );
}