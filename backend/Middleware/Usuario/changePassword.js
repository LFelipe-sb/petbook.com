import express from 'express';
import db from './loginQuery.js';
import nodemailer from 'nodemailer';
import smtp from '../../config/smtp.js';

const router = express.Router();

const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: false,
    auth: {
        user: smtp.user,
        pass: smtp.pass,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

async function sendEmail(email, newPassword) {

    await transporter.sendMail({
        subject: `Redefinição de Senha - Petbook`,
        from: `Suporte Petbook <petbookcontatoetec@gmail.com>`,
        to: `${email}`,
        html: `
        <html>
            <body>
                <p>Você solicitou a recuperação de senha para o site: PETBOOK.COM.
                Sua nova senha de acesso ao site é: <h3> ${newPassword} </h3> </p>
                <a href="https://www.google.com"> Clique aqui para acessar o site </a>
            </body>
        </html>
        `
    });
}

router.post('/', async (req, res) => {
    
    const {email} = req.body;
    const user = await db.checkEmail(email);

    if(user.length > 0) {
        const key = (Math.random() + 1).toString(36).substring(2).substring(0,10);
        const newPassword = key.replace('n','@').replace('w','!').replace('i','#').replace('t','$').replace('a','*').replace('r','%');
        await db.changePassword(email, newPassword);
        await sendEmail(email, newPassword);
        res.send('Usuario encontrado');
    } else {
        res.send('Usuario não encontrado');
    }

});

export default router;