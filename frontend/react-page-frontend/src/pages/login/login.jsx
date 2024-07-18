import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import './login.css';
import Axios from 'axios';

export function Login() {
    const handleClickLogin = (values) => {
        Axios.post("http://localhost:3001/login", {
            email: values.email,
            password: values.password
        }).then((response) => {
            console.log(response);
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
                <h1>Login</h1>

                <Formik
                    initialValues={{}}
                    onSubmit={handleClickLogin}
                    validationSchema={validationLogin}
                >
                    <Form className="login-form">
                        {/* email   =======================================================   ======= */}
                        <div className="login-form-group">
                            <Field name="email" 
                                className="form-field" 
                                placeholder="Email"
                            />
                            <ErrorMessage 
                                component="span"
                                name="email"
                                className="form-error"
                            />
                        </div>

                        {/* password    =======================================================    ======= */}
                        <div className="login-form-group">
                            <Field name="password" 
                                className="form-field" 
                                placeholder="Senha"
                            />
                            <ErrorMessage 
                                component="span"
                                name="password"
                                className="form-error"
                            />
                            <br />
                            <Link to="/registrar">
                                Não tem conta? Cadastre-se
                            </Link>
                        </div>

                        <button className="button" type="submit">
                            Login
                        </button>
                    </Form>
                </Formik>
            </div>

            
        </div>
    );
}
