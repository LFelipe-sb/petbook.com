import express from 'express';
import db from './comentarioQuery.js';

const router = express.Router();

router.post('/:id_post', (req, res) => {
  const {comment} = req.body;
  const {id_post} = req.params;
  const idUserAuth = global.loginData.users[0].id_usuario;

  if(!comment) {
    return res.send('Comentario não pode ser vazio.');
  }

  db.createComment(comment, parseInt(id_post), idUserAuth);
  res.send(comment);
});

router.get('/', async(req, res) => {
  const allComments = await db.listComments();
  res.send(allComments);
});

router.get('/:id_post', async(req, res) => {
  const {id_post} = req.params;
  const specificComments = await db.listSpecificComments(id_post);

  res.send(specificComments);

});

export default router;