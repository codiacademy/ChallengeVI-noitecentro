import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import Menu from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';
import Axios from "axios";
import logo from "../../assets/images/logo-magic.png";
import "./header.css";

export function Header() {
    const [auth, setAuth] = useState(false);
    const [staff, setStaff] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;
    useEffect(() => {
        Axios.get("http://localhost:3001/header")
            .then(res => {
                console.log("Resposta do servidor:", res.data);
                if (res.data.msg === "Autenticação bem-sucedida") {
                    setAuth(true);
                    setStaff(res.data.user.staff); // Certifique-se de que `staff` é retornado corretamente
                } else {
                    setAuth(false);
                }
            })
            .catch(err => console.log("Erro ao buscar header:", err));
    }, []);

    const handleLogout = () => {
        Axios.get("http://localhost:3001/logout")
            .then(res => {
                location.reload(true);
            }).catch(err => console.log(err));
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <div className="header--container">
            <div>
                <img src={logo} alt="Logo" className="header--logo" />
            </div>

            <div className="container--links">
                <Link className="links" to="/">Home</Link>
                <Link className="links" to="/sobre">Sobre nós</Link>
                <Link className="links" to="/tecnologias">Tecnologias</Link>
                <Link className="links" to="/servicos">Serviços</Link>
                <Link className="links" to="/contato">Contato</Link>
                {auth && staff === 1 && <Link className="links" to="/contato-crud">CRUD Contato</Link>}
                {auth && staff === 1 && <Link className="links" to="/login-crud">CRUD Login</Link>}

                {auth ? (
                    <button className="header--logout" onClick={handleLogout}>
                        <Tooltip title="Logout">
                            <Logout />
                        </Tooltip>
                    </button>
                ) : (
                    <>
                        <Tooltip title="Login">
                            <Link className="links" to="/login"><AccountCircle /></Link>
                        </Tooltip>

                        <Tooltip title="Registrar-se">
                            <Link className="links" to="/registrar"><PersonAdd /></Link>
                        </Tooltip>
                    </>
                )}
            </div>

            <button className="menu--button" onClick={toggleSidebar}>
                {isSidebarOpen ? <Close className="close" /> : <Menu />}
            </button>

            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <button className="menu--button" onClick={toggleSidebar}>
                    
                    <Tooltip title="Fechar">
                        <Close className="close" /> 
                    </Tooltip>
                      <p className="close">Fechar</p>
                </button>
                <Link className="sidebar--links" to="/" onClick={toggleSidebar}>Home</Link>
                <Link className="sidebar--links" to="/sobre" onClick={toggleSidebar}>Sobre nós</Link>
                <Link className="sidebar--links" to="/tecnologias" onClick={toggleSidebar}>Tecnologias</Link>
                <Link className="sidebar--links" to="/servicos" onClick={toggleSidebar}>Serviços</Link>
                <Link className="sidebar--links" to="/contato" onClick={toggleSidebar}>Contato</Link>
                {auth && staff === 1 && <Link className="sidebar--links" to="/contato-crud" onClick={toggleSidebar}>CRUD Contato</Link>}
                {auth && staff === 1 && <Link className="sidebar--links" to="/login-crud" onClick={toggleSidebar}>CRUD Login</Link>}

                {auth ? (
                    <button className="sidebar--logout" onClick={() => { handleLogout(); toggleSidebar(); }}>
                        <Tooltip title="Logout">
                            <Logout />
                        </Tooltip>
                    </button>
                ) : (
                    <>
                        <Tooltip title="Login">
                            <Link className="sidebar--links" to="/login" onClick={toggleSidebar}><AccountCircle /></Link>
                        </Tooltip>

                        <Tooltip title="Registrar-se">
                            <Link className="sidebar--links" to="/registrar" onClick={toggleSidebar}><PersonAdd /></Link>
                        </Tooltip>
                    </>
                )}
            </div>
        </div>
    );
}
