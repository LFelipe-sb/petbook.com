import database from '../../Database/connection.js';

async function listPostPerUser(idUserAuth) {
  const conn = await database.connect();
  const sql = 'SELECT * FROM tbl_postagem WHERE status_post = "A" AND fk_id_usario = ?';
  const [rows] = await conn.query(sql, idUserAuth);
  return rows;
}

export default {listPostPerUser}