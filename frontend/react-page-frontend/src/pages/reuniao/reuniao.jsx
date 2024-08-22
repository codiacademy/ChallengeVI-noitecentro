import "./reuniao.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";

export function Reuniao() {
    const [values, setValues] = useState({
        data: "",
        horario: "",
        telefone: "",
        ideias: "",
        designlink: "",
        nome: "",
        email: "",

    })

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const submitReuniao = (e) => {
        e.preventDefault();

        Axios.post("http://localhost:3001/reuniao", {
            data: values.data,
            horario: values.horario,
            telefone: values.telefone,
            ideias: values.ideias,
            designlink: values.designlink,
            nome: values.nome,
            email: values.email,
        }, {
            withCredentials: true

        }).then((res) => {
            if (res.data.msg === "Reunião agendada com sucesso!") {
                toast.success("Reunião agendada com sucesso!", {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                })
            }
        }).catch((err, res) => {
            if (err.response && err.response.status === 401) {
                navigate("/login");
            } else {
                toast.error("Erro ao agendar reunião!", {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                })
            }

        })
    }

    return (
        <div className="reuniao">
            <h1>Agende uma reunião conosco</h1>

            <div className="container-reuniao">
                <div className="left-side">
                    <div className="input-group date-hour">
                        <div className="date--group">
                            <label className="label" htmlFor="data">Data</label>
                            <input className="input" name="data" type="date" placeholder="dd/mm/aaaa" required onChange={handleChange} />
                        </div>

                        <div className="hour--group">
                            <label className="label" htmlFor="hora">Horário</label>
                            <input className="input" name="horario" type="time" required onChange={handleChange} />
                        </div>
                    </div>

                    <div className="input-group info">
                        <div className="info--inputs">
                            <label className="label" htmlFor="info">Informações da empresa:</label>
                            <input className="input" name="nome" type="text" placeholder="Nome da empresa:" required onChange={handleChange} />
                            <input className="input" name="email" type="email" placeholder="Email:" required onChange={handleChange} />
                            <input className="input" name="telefone" type="tel" placeholder="Telefone:" required onChange={handleChange} />

                            <label className="label" htmlFor="ideias">Idéias:</label>
                            <textarea className="textarea" name="ideias" placeholder="Idéias adicionais para o projeto:" onChange={handleChange} />
                        </div>

                        <div className="info--design">
                            <label className="label" htmlFor="design">Já tem um design? Cole aqui(figma, sketch, zeplin, etc):</label>
                            <input className="input" name="designlink" type="url" placeholder="https://exemplo.com/design" required onChange={handleChange} />
                        </div>
                    </div>
                </div>

            </div>

            <button className="btn--reuniao" onClick={submitReuniao}>Agendar Reunião</button>
            <ToastContainer />
        </div>
    );
}
