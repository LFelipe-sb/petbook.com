import database from '../../Database/connection.js';

async function listPost() {
    const conn = await database.connect();
    const [rows] = await conn.query('SELECT * FROM tbl_postagem WHERE status_post = "A";');
    return rows;
}

async function createPost(tituloPost, conteudoPost, peso, idade, image, user_id) {
    const conn = await database.connect();
    const sql = 'INSERT INTO tbl_postagem(titulo_post, conteudo_post, peso, idade, imagem, FK_id_usario) VALUE(?,?,?,?,?,?)'
    const dataPost = [tituloPost, conteudoPost, peso, idade, image, user_id];
    await conn.query(sql, dataPost);
}

async function listSpecificPost(id_post) {
    const conn = await database.connect();
    const sql = 'SELECT * FROM tbl_postagem WHERE status_post = "A" AND id_post = ?;';
    const [rows] = await conn.query(sql, id_post);
    return rows;
}

async function updateAccessInPost(newAccess, id_post) {
    const conn = await database.connect();
    const sql = 'UPDATE tbl_postagem SET acessos = ? WHERE id_post = ?';
    const dataUpdate = [newAccess, id_post];
    await conn.query(sql, dataUpdate);
}

async function deletePost(id_post) {
    const conn = await database.connect();
    const sql = 'UPDATE tbl_postagem SET status_post = "I" WHERE id_post = ?';
    await conn.query(sql, id_post);
}

export default {listPost, createPost, listSpecificPost, updateAccessInPost, deletePost}