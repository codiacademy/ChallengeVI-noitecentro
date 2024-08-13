const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid'); 
const cookieParser = require("cookie-parser");
const nodemailer = require('nodemailer');
const saltRounds = 10;
require("dotenv").config();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "banco"
});

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const generateResetToken = (email, id) => {
    const payload = { email, id };
    const options = { expiresIn: "15m" };
    const secret = process.env.JWT_SECRET || "jwt-secret-key";
    return jwt.sign(payload, secret, options);
};

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: '79f94f002@smtp-brevo.com',
        pass: '6x83kEsZcMFBtgpC'
    }
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token; // Verifica se o token está sendo recebido dos cookies
    console.log("Token recebido:", token);
    if (!token) {
        return res.status(401).send({ msg: "Autenticação inválida" });
    }
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if (err) {
            console.log("Erro ao verificar token:", err);
            return res.status(401).send({ msg: "Autenticação inválida" });
        }
        db.query("SELECT * FROM usuarios WHERE id = ?", [decoded.id], (err, result) => {
            if (err || result.length === 0) {
                console.log("Usuário não encontrado ou erro no banco de dados:", err);
                return res.status(401).send({ msg: "Usuário não encontrado" });
            }
            req.user = result[0];
            next();
        });
    });
};

app.get("/header", verifyUser, (req, res) => {
    return res.status(200).send({ msg: "Autenticação bem-sucedida", user: req.user });
});

app.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.status(200).send({ msg: "Logout bem-sucedido" });
});

// login e registro de usuários ====================================================================================
app.post("/register", (req, res) => {
    const { email, password } = req.body;
    const defaultStaffValue = 0; // valor padrão para a coluna "staff"

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error("Erro ao verificar email:", err);
            return res.status(500).send({ msg: "Erro no servidor" });
        }
        if (result.length === 0) {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.error("Erro ao criptografar a senha:", err);
                    return res.status(500).send({ msg: "Erro ao criptografar a senha" });
                }
                db.query("INSERT INTO usuarios (email, password, staff) VALUES (?, ?, ?)", [email, hash, defaultStaffValue], (err, result) => {
                    if (err) {
                        console.error("Erro ao cadastrar usuário:", err);
                        return res.status(500).send({ msg: "Erro ao cadastrar usuário" });
                    }
                    res.send({ msg: "Cadastrado com sucesso!" });
                });
            });
        } else {
            res.status(400).send({ msg: "Email já existe" });
        }
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, match) => {
                if (err) {
                    return res.status(500).send(err);
                }
                if (match) {
                    const id = result[0].id;
                    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET || "jwt-secret-key", { expiresIn: "1h" });
                    
                    res.cookie('token', accessToken);
                    res.send({msg: "Login efetuado com sucesso" , accessToken }); 
                } else {
                    res.status(400).send({ msg: "Senha inválida" });
                }
            });
        } else {
            res.status(404).send({ msg: "Email não encontrado" });
        }
    });
});


// Parte de forgot password =====================================================================================q

app.post("/forgot-password", (req, res) => {
    const { email } = req.body;
    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length > 0) {
            const resetToken = generateResetToken(email, result[0].id);
            const resetURL = `http://localhost:5173/reset-password/${result[0].id}/${resetToken}`;


            const mailOptions = {
                from: 'caun06lagrotta@gmail.com',
                to: email,
                subject: 'Redefinição de Senha',
                text: `Você solicitou uma redefinição de senha. Clique no link a seguir para redefinir sua senha: ${resetURL}`,
                html: `<p>Você solicitou uma redefinição de senha. Clique no link a seguir para redefinir sua senha: <a href="${resetURL}">${resetURL}</a></p>`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Erro ao enviar email:', error);
                    return res.status(500).send({ msg: 'Erro ao enviar email' });
                } else {
                    console.log('Email enviado:', info.response);
                    console.log("resetUrl:", resetURL);
                    return res.status(200).send({ msg: 'Email de redefinição de senha enviado com sucesso' });
                }
            });
        } else {
            return res.status(404).send({ msg: "Email não encontrado" });
        }
    });
});

app.get("/reset-password/:userid/:token", (req, res) => {
    const { userid, token } = req.params;

    const secret = process.env.JWT_SECRET || "jwt-secret-key";
    try {
        const payload = jwt.verify(token, secret);
        if (payload.id !== parseInt(userid, 10)) {
            return res.status(401).send({ msg: "Autenticação inválida" });
        }

        const frontendUrl = `http://localhost:5173/reset-password/${userid}/${token}`;
        return res.redirect(frontendUrl);
        
    } catch (err) {
        console.log("Erro ao verificar token:", err);
        return res.status(401).send({ msg: "Token inválido" });
    }
});

app.post("/reset-password/:userid/:token", (req, res) => {
    const { userid, token } = req.params;
    const { password } = req.body;

    console.log("Token recebido:", token);
    console.log("ID do usuário:", userid);
    const secret = process.env.JWT_SECRET || "jwt-secret-key";
    try {
        const payload = jwt.verify(token, secret);
        if (payload.id !== parseInt(userid, 10)) {
            console.log("payload:", payload);
            return res.status(401).send({ msg: "Autenticação inválida" });
        }

        // Verificar se o usuário existe
        db.query("SELECT password FROM usuarios WHERE id = ?", [userid], (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (results.length === 0) {
                return res.status(404).send({ msg: "Usuário não encontrado" });
            }

            // Criptografar a nova senha
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.error("Erro ao criptografar a senha:", err);
                    return res.status(500).send({ msg: "Erro ao criptografar a senha" });
                }

                // Atualizar a senha no banco de dados
                db.query("UPDATE usuarios SET password = ? WHERE id = ?", [hash, userid], (err, result) => {
                    if (err) {
                        console.error("Erro ao atualizar senha:", err);
                        return res.status(500).send({ msg: "Erro ao atualizar senha" });
                    }
                    res.send({ msg: "Senha atualizada com sucesso" });
                });
            });
        });
    } catch (err) {
        console.log("Erro ao verificar token:", err);
        return res.status(401).send({ msg: "Autenticação inválida" });
    }
});


// parte de contato ================================================================================================
app.post("/contactItems", verifyUser, (req, res) => {
    console.log("Recebendo requisição para /contactItems");
    console.log("Corpo da requisição:", req.body);

    const { nome, email, fone, duvida } = req.body;
    const SQL = "INSERT INTO contact (nome, email, fone, duvida) VALUES (?, ?, ?, ?)";

    db.query(SQL, [nome, email, fone, duvida], (err, result) => {
        if (err) {
            console.error("Erro ao cadastrar contato!", err);
            return res.status(500).send({ msg: "Erro ao cadastrar contato!" });
        }
        res.send({ msg: "Contato cadastrado com sucesso!" });
    });
});


// CRUD de contatos ================================================================================================
app.post("/contact", verifyUser, (req, res) => {
    const { nome, email, fone, duvida } = req.body;
    const SQL = "INSERT INTO contact (nome, email, fone, duvida) VALUES (?, ?, ?, ?)";

    db.query(SQL, [nome, email, fone, duvida], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send({ msg: "Contato cadastrado com sucesso!" });
    });
});

app.get("/contact", verifyUser, (req, res) => {
    const SQL = "SELECT * FROM contact";

    db.query(SQL, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
});

app.put("/contact", verifyUser, (req, res) => {
    const { id, nome, email, fone, duvida } = req.body;
    const SQL = "UPDATE contact SET nome = ?, email = ?, fone = ?, duvida = ? WHERE id = ?";

    db.query(SQL, [nome, email, fone, duvida, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send({ msg: "Contato atualizado com sucesso!" });
    });
});

app.delete("/contact/:id", verifyUser, (req, res) => {
    const { id } = req.params;
    const SQL = "DELETE FROM contact WHERE id = ?";

    db.query(SQL, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send({ msg: "Contato excluído com sucesso!" });
    });
});

// CRUD de usuários ================================================================================================
app.post("/users", verifyUser, (req, res) => {
    const { email, password, staff } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).send(err);
        }
        const SQL = "INSERT INTO usuarios (email, password, staff) VALUES (?, ?, ?)";

        db.query(SQL, [email, hash, staff || 0], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send({ msg: "Usuário cadastrado com sucesso!" });
        });
    });
});

app.get("/users", verifyUser, (req, res) => {
    const SQL = "SELECT * FROM usuarios";

    db.query(SQL, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
});

app.put("/users", verifyUser, (req, res) => {
    const { id, email, oldPassword, newPassword, staff } = req.body;


    db.query("SELECT password FROM usuarios WHERE id = ?", [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send({ msg: "Usuário não encontrado" });
        }

        const currentPasswordHash = results[0].password;


        if (newPassword) {
            bcrypt.compare(oldPassword, currentPasswordHash, (err, match) => {
                if (err) {
                    return res.status(500).send(err);
                }
                if (!match) {
                    return res.status(400).send({ msg: "Senha antiga inválida" });
                }


                bcrypt.hash(newPassword, saltRounds, (err, newHash) => {
                    if (err) {
                        return res.status(500).send(err);
                    }

                    let query = "UPDATE usuarios SET email = ?, password = ?, staff = ? WHERE id = ?";
                    let values = [email, newHash, staff, id];


                    db.query(query, values, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.send({ msg: "Usuário atualizado com sucesso!" });
                    });
                });
            });
        } else {

            let query = "UPDATE usuarios SET email = ?, staff = ? WHERE id = ?";
            let values = [email, staff, id];

            db.query(query, values, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.send({ msg: "Usuário atualizado com sucesso!" });
            });
        }
    });
});



app.delete("/users/:id", verifyUser, (req, res) => {
    const { id } = req.params;
    const SQL = "DELETE FROM usuarios WHERE id = ?";

    db.query(SQL, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send({ msg: "Usuário excluído com sucesso!" });
    });
});


// configurando a porta do servidor ====================================================================================
app.listen(3001, () => {
    console.log("Servidor rodando em http://localhost:3001");
});
