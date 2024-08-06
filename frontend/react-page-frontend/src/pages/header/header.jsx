import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import "./header.css";

export function Header() {
    const [auth, setAuth] = useState(false);
    const [staff, setStaff] = useState(0);

    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;
    useEffect(() => {
        Axios.get("http://localhost:3001/header")
            .then(res => {
                if (res.data.msg === "Autenticação bem-sucedida") {
                    setAuth(true);
                    setStaff(res.data.user.staff);
                } else {
                    setAuth(false);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleLogout = () => {
        Axios.get("http://localhost:3001/logout")
            .then(res => {
                location.reload(true);
            }).catch(err => console.log(err));
    }

    return (
        <div className="header--container">
            {
                auth ?
                    <div className="header--links">
                        <Link to="/">Home</Link>
                        <Link to="/sobre">Sobre nós</Link>
                        <Link to="/tecnologias">Tecnologias</Link>
                        <Link to="/servicos">Serviços</Link>
                        <Link to="/contato">Contato</Link>
                        {staff === 1 && <Link to="/contato-crud">CRUD Contato</Link>}
                        {staff === 1 && <Link to="/login-crud">CRUD Login</Link>}
                        <button onClick={handleLogout}>Sair</button>
                    </div>
                    :
                    <div className="header--links">
                        <Link to="/">Home</Link>
                        <Link to="/sobre">Sobre nós</Link>
                        <Link to="/tecnologias">Tecnologias</Link>
                        <Link to="/servicos">Serviços</Link>
                        <Link to="/contato">Contato</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/registrar">Registrar-se</Link>
                    </div>
            }
        </div>
    );
}
