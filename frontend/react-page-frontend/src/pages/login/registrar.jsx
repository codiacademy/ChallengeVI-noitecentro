import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import './login.css';
import Axios from 'axios';

export function Registrar() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);

        if (showPassword) {
            document.getElementById('password').setAttribute('type', 'password');
            document.getElementById('confirmPassword').setAttribute('type', 'password');
        } else {
            document.getElementById('password').setAttribute('type', 'text');
            document.getElementById('confirmPassword').setAttribute('type', 'text');
        }
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

    const handleClickRegister = (values, { resetForm }) => {
        Axios.post("http://localhost:3001/register", {
            email: values.email,
            password: values.password,
        }).then((res) => {
            if (res.data.msg === "Cadastrado com sucesso!") {
                navigate("/login");
                resetForm();
            }
        }).catch((err) => {
            toast.error("Erro ao concluir registro!", {
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
                    <h1>Registrar-se</h1>
                </div>

                <Formik
                    initialValues={{ email: "", password: "", confirmPassword: "" }}
                    onSubmit={handleClickRegister}
                    validationSchema={validationRegister}
                >
                    <Form className="login-form">
                        <div className="login-form-group">
                            <Field name="email" className="form-field" placeholder="Email" type="email" />
                            <ErrorMessage component="span" name="email" className="form-error" />
                        </div>
                        <div className="login-form-group">

                            <div className="show-password-container">
                                <Field id="password" name="password" className="form-field" placeholder="Senha" type="password" />
                                <button className="show-password" onClick={handleClickShowPassword}>
                                    {showPassword ? <VisibilityOff onClick={handleClickShowPassword} /> : <Visibility onClick={handleClickShowPassword} />}
                                </button>
                            </div>

                            <ErrorMessage component="span" name="password" className="form-error" />
                        </div>

                        <div className="login-form-group">
                            <div className="show-password-container">
                                <Field id="confirmPassword" name="confirmPassword" className="form-field" placeholder="Confirme sua senha" type="password" />
                                <button className="show-password" onClick={handleClickShowPassword}>
                                    {showPassword ? <VisibilityOff onClick={handleClickShowPassword} /> : <Visibility onClick={handleClickShowPassword} />}
                                </button>
                            </div>
                            <ErrorMessage component="span" name="confirmPassword" className="form-error" />
                        </div>

                        <button className="login-button" type="submit">
                            Registrar-se
                        </button>
                    </Form>
                </Formik>
            </div>

            <ToastContainer />
        </div>
    );
}
