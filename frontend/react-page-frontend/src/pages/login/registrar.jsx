import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import './login.css';
import Axios from 'axios';

export function Registrar() {
    const handleClickRegister = (values) => {
        Axios.post("http://localhost:3001/register", {
            email: values.email,
            password: values.password,
        }).then((response) => {
            console.log(response);
        });
    };

    const validationRegister = yup.object().shape({
        email: yup
            .string()
            .email("Email inválido")
            .required("Este campo é obrigatório"),
        password: yup
            .string()
            .min(8, "A senha deve ter no mínimo 8 caracteres")
            .required("Este campo é obrigatório"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "As senhas devem ser iguais")
            .required("Este campo é obrigatório"),
    });

    return (
        <div className='container'>
            <h1>Registrar-se</h1>

            <Formik
                initialValues={{}}
                onSubmit={handleClickRegister}
                validationSchema={validationRegister}
            >
                <Form className="login-form">
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
                    </div>
                    <div className="login-form-group">
                        <Field name="confirmPassword" 
                            className="form-field" 
                            placeholder="Confirme sua senha"
                        />
                        <ErrorMessage 
                            component="span"
                            name="confirmPassword"
                            className="form-error"
                        />
                    </div>
                    <button className="button" type="submit">
                        Registrar-se
                    </button>
                </Form>
            </Formik>
        </div>
    );
}
