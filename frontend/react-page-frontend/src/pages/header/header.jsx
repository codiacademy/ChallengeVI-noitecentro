import { Link } from "react-router-dom";
import "./header.css";

export function Header() {

    return (
        <div className="header">
            <Link to="/">Home</Link>
            <Link to="/sobre">Sobre nós</Link>
            <Link to="/tecnologias">Tecnologias</Link>
            <Link to="/servicos">Serviços</Link>
            <Link to="/contato">Contato</Link>
            <Link to="/login">login</Link>
            <Link to="/contato-crud">crud contato</Link>
            <Link to="/login-crud">crud login</Link>

        </div>
    );
}

export function HeaderComum() {

    return (
        <div className="header">
            <Link to="/">Home</Link>
            <Link to="/sobre">Sobre nós</Link>
            <Link to="/tecnologias">Tecnologias</Link>
            <Link to="/servicos">Serviços</Link>
            <Link to="/contato">Contato</Link>
            <Link to="/login">login</Link>

           
        </div>
    );
}
