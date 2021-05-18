import express from 'express';
import db from './usuarioQuery.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await db.listUser();
    res.send(users);
});

export default router;