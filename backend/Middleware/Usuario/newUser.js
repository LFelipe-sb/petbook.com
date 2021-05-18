import express from 'express';
import db from './usuarioQuery.js';

const router = express.Router();

router.post('/', async (req, res) => {

    const {email, username, password_user} = req.body;

    const users = await db.listUser();

    const checkUser = users.some(item => {
        return item.email === email;
    });

    if(!email || !username || !password_user) {
        res.send('Dados para cadastro incompletos');
    } else if(checkUser) {
        res.send('Email de usuário já cadastrado no sistema.');
    } else {
        await db.insertUser(email, username, password_user);
        res.send('Usuário cadastrado com sucesso');
    }   
});

export default router;