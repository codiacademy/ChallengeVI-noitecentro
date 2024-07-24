import { useState, useEffect } from 'react';
import Axios from 'axios'; 
import './crud.css';
import { FormDialog } from './dialog/dialog.jsx';

export function ContatoCrud() {
    const [values, setValues] = useState();
    const [listContact, setListContact] = useState();

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

                <input className="register--input" type="text" name="nome" placeholder="Nome:" onChange={handleChangeValues} />
                <input className="register--input" type="text" name="email" placeholder="Email:" onChange={handleChangeValues} />
                <input className="register--input" type="tel" name="telefone" placeholder="Telefone:" onChange={handleChangeValues} />
                <textarea className="register--input" type="text" name="duvida" placeholder="Dúvida:" onChange={handleChangeValues} />

                <button className="register--button" onClick={handleClickButton}>Cadastrar</button>
            </div>

            {typeof listContact !== "undefined" && listContact.map((value) => {
                return <Card key={value.id} listCard={listContact} setListContact={setListContact} id={value.id} name={value.nome} email={value.email} fone={value.fone} duvida={value.duvida}></Card>
            })}
            
        </div>
    );
}

export function Card(props){
    return(
        <div className="card--container">
            <h1 className="card--nome"> {props.name} </h1>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 card--svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 card--svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>


            <p className="card--email"> {props.email} </p>
            <p className="card--telefone"> {props.fone} </p>
            <p className="card--duvida"> {props.duvida} </p>
        </div>
    )
}