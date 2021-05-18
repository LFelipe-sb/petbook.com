import express from 'express';
import db from './loginQuery.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
let secret;

router.post('/', async (req, res) => {
    const {email, password_user} = req.body;
    const users = await db.login(email, password_user);

    if(users.length > 0) {
        secret = JSON.stringify(users[0].register_user);
        const token = jwt.sign({userId: users[0].id_usuario}, secret, {expiresIn:600});
        global.loginData = {auth: true, token, users};
        res.send(global.loginData);
    } else {
        res.send('Login incorreto');
    }
});

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, secret, (err, decoded) => {
        if(err) {
            return res.status(401).send('Usuário não autenticado.');
        } 
        req.userId = decoded.userId;
        next();
    });
}

export default router;
export {verifyJWT};