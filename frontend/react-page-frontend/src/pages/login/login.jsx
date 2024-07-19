import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import './login.css';
import Axios from 'axios';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos'

// https://cssgradient.io/
// https://excalidraw.com/

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

    useEffect(() =>{
        AOS.init({
            offset: 0,
            duration: 800,
            once: true,
        });
    }, [])

    return (
        <div className='container' >

            <div className='contents'>
                <div className='box-tittle'>
                    <h1>Login</h1>
                </div>
                

                <Formik
                    initialValues={{}}
                    onSubmit={handleClickLogin}
                    validationSchema={validationLogin}
                >
                    <Form>
                        {/* email   =======================================================   ======= */}
                            <Field name="email" 
                                className="form-field" 
                                placeholder="Email"
                            />
                            <ErrorMessage 
                                component="span"
                                name="email"
                                className="form-error"
                            />
                        

                        {/* password    =======================================================    ======= */}
                       
                            <Field name="password" 
                                className="form-field" 
                                placeholder="Senha"
                                type="password"
                            />
                            <ErrorMessage 
                                component="span"
                                name="password"
                                className="form-error"
                            />
                            
                            
                            <Link className='link' to="/registrar">
                                Não tem conta? Cadastre-se
                            </Link>
                      

                        <button data-aos="fade-up" data-aos-anchor-placement="center-center" type="submit">
                            Login
                        </button>
                    </Form>
                </Formik>
            </div>

            
        </div>
    );
}
