import { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Axios from 'axios';
import "./crud.css";
import { FormDialogReuniao } from './dialog/dialog.jsx';

export function ReuniaoCrud() {
    const [values, setValues] = useState({
        data: '',
        horario: '',
        telefone: '',
        ideias: '',
        designlink: '',
        nome: '',
        email: ''
    });

    const [listReuniao, setListReuniao] = useState([]);

    const handleChangeValues = (event) => {
        setValues((prevValue) => ({
            ...prevValue,
            [event.target.name]: event.target.value
        }));
    };

    const handleClickButton = (event) => {
        event.preventDefault();

        Axios.post("http://localhost:3001/reuniaocrud", {
            data: values.data,
            horario: values.horario,
            telefone: values.telefone,
            ideias: values.ideias,
            designlink: values.designlink,
            nome: values.nome,
            email: values.email
        }).then((response) => {
            console.log(response);

            Axios.get("http://localhost:3001/reuniaocrud").then((response) => {
                setListReuniao(response.data);
            });
        });

        setValues({
            data: '',
            horario: '',
            telefone: '',
            ideias: '',
            designlink: '',
            nome: '',
            email: ''
        });
    };

    useEffect(() => {
        Axios.get("http://localhost:3001/reuniaocrud").then((response) => {
            setListReuniao(response.data);
        });
    }, []);

    return (
        <div className="app--container">
            <div className="register--container">
                <h1 className="register--title"> Crud Reunião </h1>

                <form className="inputs--container" onSubmit={handleClickButton}>
                    <input className="register--input" type="date" value={values.data} placeholder="dd/mm/aaaa" name="data" onChange={handleChangeValues} />
                    <input className="register--input" type="time" value={values.horario} placeholder="Horario" name="horario" onChange={handleChangeValues} />
                    <input className="register--input" type="tel" value={values.telefone} placeholder="Telefone" name="telefone" onChange={handleChangeValues} />
                    <input className="register--input" type="text" value={values.nome} placeholder="Nome" name="nome" onChange={handleChangeValues} />
                    <input className="register--input" type="text" value={values.email} placeholder="Email" name="email" onChange={handleChangeValues} />
                    <input className="register--input" type="text" value={values.designlink} placeholder="Link" name="designlink" onChange={handleChangeValues} />
                    <textarea className="area--input" value={values.ideias} placeholder="Ideias" name="ideias" onChange={handleChangeValues} />
                    <button className="register--button" type="submit"> Cadastrar </button>
                </form>
            </div>

            {listReuniao.map((value) => (
                <CardReuniao
                    key={value.id}
                    listCard={listReuniao}
                    setListReuniao={setListReuniao}
                    id={value.id}
                    nome={value.nome}
                    data={value.data}
                    horario={value.horario}
                    telefone={value.telefone}
                    designlink={value.designlink}
                    email={value.email}
                    ideias={value.ideias}
                />
            ))}
        </div>
    );
}

export function CardReuniao(props) {
    const [open, setOpen] = useState(false);
    const handleClickCard = () => {
        setOpen(true);
    };

    const formatDate = (date) => {
        const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
        return new Date(date).toLocaleDateString('pt-BR', options);
    }

    const formatTime = (timeString) => {
        const [hour, minute] = timeString.split(':');
        const date = new Date();
        date.setHours(hour, minute);
        return new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            
        }).format(date)
    }



    return (
        <>
            <FormDialogReuniao 
                open={open} 
                setOpen={setOpen} 
                id={props.id} 
                nome={props.nome} 
                data={props.data} 
                horario={props.horario} 
                telefone={props.telefone} 
                designlink={props.designlink} 
                email={props.email} 
                ideias={props.ideias} 
                setListReuniao={props.setListReuniao}
            />
            <div className="card--container">
                <div className="title--icon">
                    <h1 className="card--nome"> {props.nome} </h1>
                    <Tooltip title="Editar Informações">
                        <svg 
                            onClick={handleClickCard} 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="size-6 card--svg"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM16.862 4.487L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" 
                            />
                        </svg>
                    </Tooltip>
                </div>
                <p className="card--data"> Data: {formatDate(props.data)} </p>
                <p className="card--horario"> Horario: {formatTime(props.horario)} </p>
                <p className="card--telefone"> Telefone: {props.telefone} </p>
                <p className="card--email"> Email: {props.email} </p>
                <p className="card--nome"> Nome: {props.designlink} </p>
                <p className="card--duvida"> Ideias: {props.ideias} </p>
            </div>
        </>
    );
}
