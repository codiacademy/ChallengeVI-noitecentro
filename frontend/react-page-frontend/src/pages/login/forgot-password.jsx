import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';
import Axios from 'axios';

export function ForgotPassword() {
    
    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;

    const validationForgotPassword = yup.object().shape({
        email: yup
            .string()
            .email('Email inválido')
            .required('Este campo é obrigatório')
    });

    const handleForgotPassword = (values, { resetForm }) => {
        Axios.post("http://localhost:3001/forgot-password", {
            email: values.email

        }).then((res) => {
            if (res.data.msg === "Email de redefinição de senha enviado com sucesso") {
                toast.success("Email de redefinição de senha enviado com sucesso", {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                })
                resetForm();
            }
        }).catch((err) => {
            toast.error("Erro ao enviar link para redefinir a senha", {
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
        <div className='container'>
            <div className='contents'>
                <div className='box-tittle'>
                    <h1>Esqueceu a senha?</h1>
                </div>

                <Formik
                    initialValues={{ email: ''}}
                    onSubmit={handleForgotPassword}
                    validationSchema={validationForgotPassword}
                >
                    <Form className="login-form">
                        <div className="login-form-group">
                            <Field name="email" className="form-field" placeholder="Email" />
                            <ErrorMessage component="span" name="email" className="form-error" />
                        </div>

                        <button className="login-button" type="submit">
                            Quero receber uma confirmação por email
                        </button>
                    </Form>
                </Formik>
            </div>

            <ToastContainer />
        </div>
    );
}
