import { Header } from "../../pages/header/header.jsx";
import { Footer } from "../footer/footer.jsx";
import angular from "../../assets/images/techs/angular-tech.svg";
import react from "../../assets/images/techs/react-tech.svg";
import vue from "../../assets/images/techs/vue-tech.svg";
import javascript from "../../assets/images/techs/javascript-tech.svg";
import typescript from "../../assets/images/techs/typescript-tech.svg";
import java from "../../assets/images/techs/java-tech.svg";
import php from "../../assets/images/techs/php-tech.svg";
import node from "../../assets/images/techs/node-tech.svg";
import flutter from "../../assets/images/techs/flutter-tech.svg";
import mongodb from "../../assets/images/techs/mongodb-tech.svg";
import mysql from "../../assets/images/techs/mysql-tech.svg";
import sqlite from "../../assets/images/techs/sqlite-tech.svg";
import bootstrap from "../../assets/images/techs/bootstrap-tech.svg";
import tailwind from "../../assets/images/techs/tailwind-tech.svg";
import './tecnologias.css';

export function Tecnologias() {
    return (
        <div className="techs-body">
            <Header />
            <div className="techs-content">
                <h1 className="techs-title">Tecnologias que utilizamos</h1>

                <div className="container-text-techs">
                    <p className="techs-text">
                        Trabalhamos com as tecnologias mais atuais do mercado, considerando as necessidades específicas de cada software desenvolvido.
                    </p>
                </div>

                <div className="techs-icons">
                    <img src={angular} alt="Angular" className="icon" />
                    <img src={react} alt="React" className="icon" />
                    <img src={vue} alt="Vue" className="icon" />
                    <img src={javascript} alt="JavaScript" className="icon" />
                    <img src={typescript} alt="TypeScript" className="icon" />
                    <img src={java} alt="Java" className="icon" />
                    <img src={php} alt="PHP" className="icon" />

                    <img src={node} alt="Node.js" className="icon" />
                    <img src={flutter} alt="Flutter" className="icon" />
                    <img src={mongodb} alt="MongoDB" className="icon" />
                    <img src={mysql} alt="MySQL" className="icon" />
                    <img src={sqlite} alt="SQLite" className="icon" />
                    <img src={bootstrap} alt="Bootstrap" className="icon" />
                    <img src={tailwind} alt="Tailwind" className="icon" />
                </div>

                <div className="container-text-techs">
                    <p className="techs-text">
                        Desenvolvemos softwares para todas as necessidades e segmentos de mercados!
                    </p>
                </div>
            </div>

            <Footer/>
        </div>
    );
}
