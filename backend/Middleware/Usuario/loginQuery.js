import database from '../../Database/connection.js';

async function login(email, password_user) {
    const conn = await database.connect();
    const sql = 'SELECT * FROM tbl_usuario WHERE email=? and password_user=?';
    const dataLogin = [email, password_user];
    const [rows] = await conn.query(sql, dataLogin);
    return rows;
}

async function checkEmail(email) {
    const conn = await database.connect();
    const sql = 'SELECT * FROM tbl_usuario WHERE email=? AND status_user = "A"';
    const [rows] = await conn.query(sql, email);
    return rows;
}

async function changePassword(email, newPassword) {
    const conn = await database.connect();
    const sql = 'UPDATE tbl_usuario SET password_user = ? WHERE email = ?';
    const dataNewPass = [newPassword, email];
    await conn.query(sql, dataNewPass);
}

export default {login, checkEmail, changePassword};