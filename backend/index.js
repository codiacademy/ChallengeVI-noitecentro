const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "banco"
});

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));

// login e registro de usuários ====================================================================================
app.post("/register", (req, res) => {
    const { email, password } = req.body;
    
    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
        if (err) {
            return res.status(500).send({ msg: "Erro no servidor" });
        }
        if (result.length === 0) {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    return res.status(500).send({ msg: "Erro ao criptografar a senha" });
                }
                db.query("INSERT INTO usuarios (email, password) VALUES (?, ?)", [email, hash], (err, result) => {
                    if (err) {
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
                    res.send({ msg: "Login efetuado com sucesso" });
                } else {
                    res.status(400).send({ msg: "Senha inválida" });
                }
            });
        } else {
            res.status(404).send({ msg: "Email não encontrado" });
        }
    });
});


// parte de contato ================================================================================================
app.post("/contactItems", (req, res) => {
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
app.post("/contact", (req, res) => {
    const { nome, email, fone, duvida } = req.body;
    const SQL = "INSERT INTO contact (nome, email, fone, duvida) VALUES (?, ?, ?, ?)";
    
    db.query(SQL, [nome, email, fone, duvida], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send({ msg: "Contato cadastrado com sucesso!" });
    });
});

app.get("/contact", (req, res) => {
    const SQL = "SELECT * FROM contact";
    
    db.query(SQL, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
});

app.put("/contact", (req, res) => {
    const { id, nome, email, fone, duvida } = req.body;
    const SQL = "UPDATE contact SET nome = ?, email = ?, fone = ?, duvida = ? WHERE id = ?";
    
    db.query(SQL, [nome, email, fone, duvida, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send({ msg: "Contato atualizado com sucesso!" });
    });
});

app.delete("/contact/:id", (req, res) => {
    const { id } = req.params;
    const SQL = "DELETE FROM contact WHERE id = ?";
    
    db.query(SQL, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send({ msg: "Contato excluído com sucesso!" });
    });
});


// CRUD de usuários ================================================================================================

app.post("/users", (req, res) => {
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
            res.send({ msg: "Usuario cadastrado com sucesso!" });
        });
    });
});

app.get("/users", (req, res) => {
    const SQL = "SELECT * FROM usuarios";
    
    db.query(SQL, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
});

app.put("/users", (req, res) => {
    const { id, email, password, staff } = req.body;
    
    if (password) {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                return res.status(500).send(err);
            }
            const SQL = "UPDATE usuarios SET email = ?, password = ?, staff = ? WHERE id = ?";
            
            db.query(SQL, [email, hash, staff, id], (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.send({ msg: "Usuario atualizado com sucesso!" });
            });
        });
    } else {
        const SQL = "UPDATE usuarios SET email = ?, staff = ? WHERE id = ?";
        
        db.query(SQL, [email, staff, id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send({ msg: "Usuario atualizado com sucesso!" });
        });
    }
});

app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const SQL = "DELETE FROM usuarios WHERE id = ?";
    
    db.query(SQL, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send({ msg: "Usuario excluído com sucesso!" });
    });
});


// configurando a porta do servidor ====================================================================================

app.listen(3001, () => {
    console.log("Servidor rodando em http://localhost:3001");
});
