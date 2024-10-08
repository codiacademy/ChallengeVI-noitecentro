import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "../crud.css"
import Axios from "axios";

export function FormDialog(props) {
    const [editValues, setEditValues] = useState({
        id: props.id,
        name: props.name,
        email: props.email,
        fone: props.fone,
        duvida: props.duvida,
    });

    const handleEdit = () => {
        Axios.put("http://localhost:3001/contact", {
            id: editValues.id,
            nome: editValues.name,
            email: editValues.email,
            fone: editValues.fone,
            duvida: editValues.duvida,
        }).then((response) => {
            console.log(response);
            Axios.get("http://localhost:3001/contact").then((response) => {
                props.setListContact(response.data);
            });
        });
        handleClose();
    };

    const handleDelete = () => {
        Axios.delete(`http://localhost:3001/contact/${editValues.id}`).then((response) => {
            console.log(response);
            Axios.get("http://localhost:3001/contact").then((response) => {
                props.setListContact(response.data);
            });
        });
        handleClose();
    };

    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleChangeValues = (value) => {
        setEditValues((prevValues) => ({
            ...prevValues,
            [value.target.id]: value.target.value,
        }));
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"> Editar </DialogTitle>
                <DialogContent>
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="id" label="id" type="text" disabled value={editValues.id} fullWidth />
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="name" label="Nome" type="text" value={editValues.name} fullWidth />
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="fone" label="Telefone" type="tel" value={editValues.fone} fullWidth />
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="email" label="Email" type="email" value={editValues.email} fullWidth />
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="duvida" label="Dúvida" type="text" value={editValues.duvida} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button className="btn--dialog" onClick={handleClose} color="primary">Cancelar</Button>
                    <Button className="btn--dialog" onClick={handleEdit} color="primary">Salvar</Button>
                    <Button className="btn--dialog" onClick={handleDelete} color="primary">Remover</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export function FormDialogLogin(props) {
    const [editValues, setEditValues] = useState({
        id: props.id,
        email: props.email,
        password: props.password,
        staff: props.staff,
    });

    const handleEdit = () => {
        Axios.put("http://localhost:3001/users", {
            id: editValues.id,
            email: editValues.email,
            password: editValues.password,
            staff: editValues.staff
        }).then((response) => {
            console.log(response);
            Axios.get("http://localhost:3001/users").then((response) => {
                props.setListLogin(response.data);
            });
        });

        handleClose();
    };

    const handleDelete = () => {
        Axios.delete(`http://localhost:3001/users/${editValues.id}`).then((response) => {
            console.log(response);
            Axios.get("http://localhost:3001/users").then((response) => {
                props.setListLogin(response.data);
            });
        });
        handleClose();
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleChangeValues = (value) => {
        setEditValues((prevValues) => ({
            ...prevValues,
            [value.target.name]: value.target.value,
        }));
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Editar</DialogTitle>

                <DialogContent>
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="id" name="id" label="id" type="text" disabled fullWidth value={editValues.id} />
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="email" name="email" label="Email" type="email" fullWidth value={editValues.email} />
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="password" name="password" label="Senha" type="password" fullWidth value={editValues.password} disabled />
                    <Select id="staff" name="staff" value={editValues.staff} onChange={handleChangeValues} fullWidth>
                        <MenuItem value={0}>Usuário Comum</MenuItem>
                        <MenuItem value={1}>Administrador</MenuItem>
                    </Select>
                </DialogContent>

                <DialogActions>
                    <Button className="btn--dialog" onClick={handleClose} color="primary">
                        Cancelar
                    </Button>

                    <Button className="btn--dialog" onClick={handleEdit} color="primary">
                        Salvar
                    </Button>

                    <Button className="btn--dialog" onClick={handleDelete} color="primary">
                        Remover
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export function FormDialogReuniao(props) {
    const [editValues, setEditValues] = useState({
        id: props.id,
        data: props.data,
        horario: props.horario,
        telefone: props.telefone,
        ideias: props.ideias,
        designlink: props.designlink,
        nome: props.nome,
        email: props.email
    });

    const handleEdit = () => {
        Axios.put("http://localhost:3001/reuniaoCrud", {
            id: editValues.id,
            data: editValues.data,
            horario: editValues.horario,
            telefone: editValues.telefone,
            ideias: editValues.ideias,
            designlink: editValues.designlink,
            nome: editValues.nome,
            email: editValues.email
        }).then((response) => {
            console.log(response);
            Axios.get("http://localhost:3001/reuniaoCrud").then((response) => {
                props.setListReuniao(response.data);
            });
        });
        handleClose();
    };

    const handleDelete = () => {
        Axios.delete(`http://localhost:3001/reuniaoCrud/${editValues.id}`).then((response) => {
            console.log(response);
            Axios.get("http://localhost:3001/reuniaoCrud").then((response) => {
                props.setListReuniao(response.data);
            });
        });
        handleClose();
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleChangeValues = (value) => {
        setEditValues((prevValues) => ({
            ...prevValues,
            [value.target.name]: value.target.value
        }));
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Editar</DialogTitle>
                <DialogContent>
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="id" name="id" label="id" type="text" disabled fullWidth value={editValues.id} />
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="data" name="data" label="Data" type="date" fullWidth value={editValues.data} />
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="horario" name="horario" label="Horario" type="time" fullWidth value={editValues.horario} />
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="telefone" name="telefone" label="Telefone" type="text" fullWidth value={editValues.telefone} />
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="ideias" name="ideias" label="Ideias" type="text" fullWidth value={editValues.ideias} />
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="designlink" name="designlink" label="Design Link" type="text" fullWidth value={editValues.designlink} />
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="nome" name="nome" label="Nome" type="text" fullWidth value={editValues.nome} />
                    <TextField onChange={handleChangeValues} autoFocus margin="dense" id="email" name="email" label="Email" type="email" fullWidth value={editValues.email} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancelar</Button>
                    <Button onClick={handleDelete} color="primary">Excluir</Button>
                    <Button onClick={handleEdit} color="primary">Salvar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}