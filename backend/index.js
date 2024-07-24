const express = require("express");
const app = express();
const mysql = require("mysql2");
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
app.use(cors());

app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
        if (err) {
            return res.send(err);
        }
        if (result.length === 0) {
            bcrypt.hash(password, saltRounds, (err, hash) =>{
                db.query("INSERT INTO usuarios (email, password) VALUES (?, ?)", [email, hash], (err, response) => {
                    if (err) {
                        return res.send(err);
                    }
                    res.send({ msg: "Cadastrado com sucesso!" });
                });
            })
        } else {
            res.send({ msg: "Email já existe" });
        }
    });
});

app.post("/login", (req, res)=> {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
        if(err){
            res.send(err);
        }
        if(result.length > 0){
            bcrypt.compare(password, result[0].password, (err, isMatch) => {
                if(isMatch){
                    res.send({msg: "Login efetuado com sucesso"});
                }else{
                    res.send({msg: "Senha inválida"});
                }
            });
        } else {
            res.send({msg: "Email não encontrado"});
        }
    });
});



// Tabela de contatos ==============================================================================

app.post("/contact", (req, res) => {
   const { nome } = req.body;
   const { email } = req.body;
   const { fone } = req.body;
   const { duvida } = req.body;

   let SQL = "INSERT INTO contact (nome, email, fone, duvida) VALUES (?, ?, ?, ?)";

   db.query(SQL, [nome, email, fone, duvida], (err, result) =>{
        console.log(err);
   })
});

app.get("/contact", (req, res) => {
    let SQL = "SELECT * FROM contact";

    db.query(SQL, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});


app.listen(3001, () => {
    console.log("Servidor rodando em http://localhost:3001");
});

