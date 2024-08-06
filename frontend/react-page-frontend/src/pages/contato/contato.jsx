import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import "./contato.css"

export function Contato() {
  const [values, setValues] = useState({
    nome: "",
    email: "",
    telefone: "",
    duvida: "",
  });

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
      fone: values.telefone,
      duvida: values.duvida,
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
        toast.error("Erro ao cadastrar contato!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      });
  };

  return (
    <div className="global--container">
      <div className="container--contact">
        <h1 className="title-contact">Contato</h1>
        <form className="form-contact" onSubmit={submitContact}>
          <input className="form-contact-input"
            type="text"
            name="nome"
            placeholder="Nome"
            value={values.nome}
            onChange={handleChange}
          />
          <input className="form-contact-input"
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
          />
          <input className="form-contact-input"
            type="tel"
            name="telefone"
            placeholder="Telefone"
            value={values.telefone}
            onChange={handleChange}
          />
          <textarea className="form-contact-textarea"
            name="duvida"
            cols="30"
            rows="10"
            placeholder="Descreva sua dúvida:"
            value={values.duvida}
            onChange={handleChange}
          />
          <button className="btn-contact" type="submit">Enviar</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
