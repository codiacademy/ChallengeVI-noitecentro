import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';
import Axios from 'axios';

export function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);

        if (showPassword) {
            document.getElementById('password').setAttribute('type', 'password');
        } else {
            document.getElementById('password').setAttribute('type', 'text');
        }
    };

    const validationLogin = yup.object().shape({
        email: yup
            .string()
            .email('Email inválido')
            .required('Este campo é obrigatório'),
        password: yup
            .string()
            .min(8, 'A senha deve ter no mínimo 8 caracteres')
            .required('Este campo é obrigatório')
    });

    const handleClickLogin = (values, { resetForm }) => {
        Axios.post("http://localhost:3001/login", {
            email: values.email,
            password: values.password
        }).then((res) => {
            if (res.data.msg === "Login efetuado com sucesso") {
                navigate("/");
                resetForm();
            }
        }).catch((err) => {
            toast.error("Erro ao entrar na conta", {
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
                    <h1>Login</h1>
                </div>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={handleClickLogin}
                    validationSchema={validationLogin}
                >
                    <Form className="login-form">
                        <div className="login-form-group">
                            <Field name="email" className="form-field" placeholder="Email" />
                            <ErrorMessage component="span" name="email" className="form-error" />
                        </div>
                        <div className="login-form-group login-form-group-password">
                            
                            <div className="show-password-container">
                                <Field id="password" name="password" className="form-field" placeholder="Senha" type="password" />
                                <button className="show-password" onClick={handleClickShowPassword}>
                                    {showPassword ? <VisibilityOff onClick={handleClickShowPassword} /> : <Visibility onClick={handleClickShowPassword} />}
                                </button>
                            </div>
                            <ErrorMessage component="span" name="password" className="form-error" />
                        </div>

                        <Link className='link' to="/registrar">Não tem conta? Cadastre-se</Link>
                        <Link className='link' to="/forgot-password">Esqueceu sua senha?</Link>

                        <button className="login-button" type="submit">
                            Login
                        </button>
                    </Form>
                </Formik>
            </div>

            <ToastContainer />
        </div>
    );
}
