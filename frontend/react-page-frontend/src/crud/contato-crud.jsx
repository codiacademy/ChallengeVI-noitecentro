import { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Axios from 'axios';
import './crud.css';
import { FormDialog } from './dialog/dialog.jsx';

export function ContatoCrud() {
    const [values, setValues] = useState({
        nome: '',
        email: '',
        telefone: '',
        duvida: '',
    });

    const [listContact, setListContact] = useState([]);

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    };

    const handleClickButton = () => {
        Axios.post("http://localhost:3001/contact", {
            nome: values.nome,
            email: values.email,
            fone: values.telefone,
            duvida: values.duvida,

        }).then((response) => {
            console.log(response);

            Axios.get("http://localhost:3001/contact").then((response) => {
                setListContact(response.data);
            });
        });

        setValues({
            nome: '',
            email: '',
            telefone: '',
            duvida: '',
        });

    };

    useEffect(() => {

        Axios.get("http://localhost:3001/contact").then((response) => {
            setListContact(response.data);
        });
    }, []);

    return (
        <div className="app--container">
            <div className="register--container">
                <h1 className="register--title">Crud Contato</h1>

                <div className="inputs--container">
                    <input value={values.nome} className="register--input" type="text" name="nome" placeholder="Nome:" onChange={handleChangeValues} />
                    <input value={values.email} className="register--input" type="text" name="email" placeholder="Email:" onChange={handleChangeValues} />
                    <input value={values.telefone} className="register--input" type="tel" name="telefone" placeholder="Telefone:" onChange={handleChangeValues} />
                </div>

                <textarea value={values.duvida} className="area--input" name="duvida" placeholder="Dúvida:" onChange={handleChangeValues}></textarea>

                <button className="register--button" onClick={handleClickButton}>Cadastrar</button>
            </div>

            {listContact.map((value) => (
                <Card key={value.id} listCard={listContact} setListContact={setListContact} id={value.id} name={value.nome} email={value.email} fone={value.fone} duvida={value.duvida}></Card>
            ))}
        </div>
    );
}

export function Card(props) {
    const [open, setOpen] = useState(false);

    const handleClickCard = () => {
        setOpen(true);
    }

    return (
        <>
            <FormDialog open={open} setOpen={setOpen} id={props.id} name={props.name} email={props.email} fone={props.fone} duvida={props.duvida} listCard={props.listCard} setListContact={props.setListContact} />

            <div className="card--container">
                <div className="title--icon">
                    <h1 className="card--nome"> {props.name} </h1>

                    <Tooltip title="Editar Informações">
                        <svg onClick={handleClickCard} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 card--svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </Tooltip>

                </div>


                <p className="card--email"> email: {props.email} </p>
                <p className="card--telefone">telefone: {props.fone} </p>
                <p className="card--duvida">duvida: {props.duvida} </p>
            </div>
        </>
    )
}
