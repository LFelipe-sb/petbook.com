import express from 'express';
import usuarioRouter from './Middleware/Usuario/usuarioRouter.js';
import newUser from './Middleware/Usuario/newUser.js';
import login, {verifyJWT} from './Middleware/Usuario/loginRouter.js';
import postRouter from './Middleware/Posts/postRouter.js';
import changePassword from './Middleware/Usuario/changePassword.js';
import commentPosts from './Middleware/Comentarios/comentarioRouter.js';
import statistics from './Middleware/Statistic/StatisticRouter.js';

const router = express.Router();

router.use('/usuarios', verifyJWT, usuarioRouter);
router.use('/newUser', newUser);
router.use('/login', login);
router.use('/post', verifyJWT, postRouter);
router.use('/reset', changePassword);
router.use('/comments', verifyJWT, commentPosts);
router.use('/statistic', verifyJWT, statistics);

export default router;