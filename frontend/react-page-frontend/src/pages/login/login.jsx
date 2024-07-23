import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import './login.css';
import Axios from 'axios';

export function Login() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleClickLogin = (values) => {
        Axios.post("http://localhost:3001/login", {
            email: values.email,
            password: values.password
        }).then((response) => {
            setMessage(response.data.msg);
            if (response.data.msg === "Login efetuado com sucesso") {
                navigate("/"); 
            }
        });
    }

    const validationLogin = yup.object().shape({
        email: yup
            .string()
            .email("Email inválido")
            .required("Este campo é obrigatório"),
        password: yup
            .string()
            .min(8, "A senha deve ter no mínimo 8 caracteres")
            .required("Este campo é obrigatório"),
    });

    return (
        <div className='container'>
            <div className='contents'>
                <div className='box-tittle'>
                    <h1>Login</h1>
                </div>

                {message && <p className="message">{message}</p>}

                <Formik
                    initialValues={{}}
                    onSubmit={handleClickLogin}
                    validationSchema={validationLogin}
                >
                    <Form>
                        <Field name="email" className="form-field" placeholder="Email" />
                        <ErrorMessage component="span" name="email" className="form-error" />
                        
                        <Field name="password" className="form-field" placeholder="Senha" type="password" />
                        <ErrorMessage component="span" name="password" className="form-error" />
                        
                        <Link className='link' to="/registrar">Não tem conta? Cadastre-se</Link>
                        
                        <button type="submit">Login</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}
