const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const saltRounds = 10;

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

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({ msg: "Autenticação inválida" });
    }
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if (err) {
            return res.status(401).send({ msg: "Autenticação inválida" });
        }
        db.query("SELECT * FROM usuarios WHERE id = ?", [decoded.id], (err, result) => {
            if (err || result.length === 0) {
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
    const defaultStaffValue = 0;

    console.log("Recebido:", { email, password });

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
                console.log("Hash:", hash);
                db.query("INSERT INTO usuarios (email, password, staff) VALUES (?, ?, ?)", [email, hash, defaultStaffValue], (err, result) => {
                    if (err) {
                        console.error("Erro ao cadastrar usuário:", err);
                        return res.status(500).send({ msg: "Erro ao cadastrar usuário" });
                    }
                    console.log("Usuário cadastrado com sucesso:", result);
                    res.send({ msg: "Cadastrado com sucesso!" });
                });
            });
        } else {
            console.log("Email já existe:", email);
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

            console.log("Senha fornecida:", password);
            console.log("Hash armazenado:", result[0].password);

            bcrypt.compare(password, result[0].password, (err, match) => {
                if (err) {
                    return res.status(500).send(err);
                }
                if (match) {
                    const id = result[0].id;
                    const token = jwt.sign({ id }, "jwt-secret-key", { expiresIn: "1d" });
                    res.cookie('token', token);

                    res.send({ msg: "Login efetuado com sucesso" });
                    
                } else {
                    console.log("Senha inválida:", password);
                    res.status(400).send({ msg: "Senha inválida" });
                }
            });
        } else {
            res.status(404).send({ msg: "Email não encontrado" });
        }
    });
});

// parte de contato ================================================================================================
app.post("/contactItems", verifyUser, (req, res) => {
    const { nome, email, fone, duvida } = req.body;
    const SQL = "INSERT INTO contact (nome, email, fone, duvida) VALUES (?, ?, ?, ?)";

    db.query(SQL, [nome, email, fone, duvida], (err, result) => {
        if (err) {
            return res.status(500).send(err);
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
            // If no new password is provided, just update the email and staff
            let query = "UPDATE usuarios SET email = ?, staff = ? WHERE id = ?";
            let values = [email, staff, id];

            // Execute the update query
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
