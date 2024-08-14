import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import "./contato.css";

export function Contato() {
  const [values, setValues] = useState({
    nome: "",
    email: "",
    fone: "",
    duvida: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const submitContact = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3001/contactItems", {
      nome: values.nome,
      email: values.email,
      fone: values.fone,
      duvida: values.duvida,
    }, {
      withCredentials: true
    })
      .then((res) => {
        if (res.data.msg === "Contato cadastrado com sucesso!") {
          toast.success("Contato cadastrado com sucesso!", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          navigate("/login");
        } else {
          toast.error("Erro ao cadastrar contato!", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
        }
      });
  };

  return (
    <div className="global--container">
      <div className="container--contact">
        <h1 className="title-contact">Contato</h1>
        <form className="form-contact" onSubmit={submitContact}>
          <input
            className="form-contact-input"
            type="text"
            name="nome"
            placeholder="Nome"
            value={values.nome}
            onChange={handleChange}
            autoComplete="on"
          />
          <input
            className="form-contact-input"
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            autoComplete="on"
          />
          <input
            className="form-contact-input"
            type="tel"
            name="fone"
            placeholder="Telefone"
            value={values.fone}
            onChange={handleChange}
            autoComplete="on"
          />
          <textarea
            className="form-contact-textarea"
            name="duvida"
            cols="30"
            rows="10"
            placeholder="Descreva sua dúvida:"
            value={values.duvida}
            onChange={handleChange}
            autoComplete="on"
          />
          <button className="btn-contact" type="submit">
            Enviar
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
