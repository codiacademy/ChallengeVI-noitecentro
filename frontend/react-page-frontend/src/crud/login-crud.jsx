import { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Axios from 'axios';
import './crud.css';
import { FormDialogLogin } from './dialog/dialog.jsx';

export function LoginCrud() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        staff: 0
    });

    const [listLogin, setListLogin] = useState([]);

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    };

    const handleClickButton = () => {
        Axios.post("http://localhost:3001/users", {
            email: values.email,
            password: values.password,
            staff: values.staff
        }).then((response) => {
            console.log(response);

            Axios.get("http://localhost:3001/users").then((response) => {
                setListLogin(response.data);
            });
        });

        setValues({
            email: '',
            password: '',
            staff: 0
        });
    };

    useEffect(() => {
        Axios.get("http://localhost:3001/users").then((response) => {
            setListLogin(response.data);
        });
    }, []);

    return (
        <div className="app--container">
            <div className="register--container">
                <h1 className="register--title">Crud Login</h1>

                <input autoComplete="off" value={values.email} className="register--input" type="text" name="email" placeholder="Email:" onChange={handleChangeValues} />
                <input autoComplete="off" value={values.password} className="register--input" type="text" name="password" placeholder="Senha:" onChange={handleChangeValues} />
                <select name="staff" id="staff" onChange={handleChangeValues} value={values.staff} className="register--input register--select">
                    <option value="" disabled>Selecione o cargo</option>
                    <option value="0">Usuário comum</option>
                    <option value="1">Administrador</option>
                </select>

                <button className="register--button" onClick={handleClickButton}>Cadastrar</button>
            </div>

            {listLogin.map((value) => (
                <CardLogin key={value.id} listCard={listLogin} setListLogin={setListLogin} id={value.id} email={value.email} password={value.password} staff={value.staff}></CardLogin>
            ))}
        </div>
    );
}

export function CardLogin(props) {
    const [open, setOpen] = useState(false);

    const handleClickCard = () => {
        setOpen(true);
    }

    return (
        <>
            <FormDialogLogin open={open} setOpen={setOpen} id={props.id} email={props.email} password={props.password} staff={props.staff} setListLogin={props.setListLogin} />

            <div className="card--container">

                <Tooltip title="Editar Informações">
                    <svg onClick={handleClickCard} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 card--svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM16.862 4.487L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </Tooltip>

                <p className="card--email">Email: {props.email}</p>
                <p className="card--telefone">Senha: {props.password}</p>
                <p className="card--cargo">Cargo: {props.staff === 0 ? "Usuário comum" : "Administrador"}</p>


            </div>
        </>
    )
}
