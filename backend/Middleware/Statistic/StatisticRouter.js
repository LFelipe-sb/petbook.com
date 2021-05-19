import express from 'express';
import db from './StatisticQuery.js';

const router = express.Router();

router.get('/', async(req, res) => {
  const idUserAuth = global.loginData.users[0].id_usuario;

  const allPosts = await db.listPostPerUser(idUserAuth);

  if(allPosts < 1) {
    return res.send('Nenhuma postagem encontrada.');
  }

  const postUser = allPosts.map(({FK_id_usario, titulo_post, acessos}) => {
    return {
      user_id: FK_id_usario,
      titulo_post,
      acessos
    }
  });
  res.send(postUser);

});

export default router;