const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

router.post('/upload/dev_news', (req, res) => {
    const { type, title, text } = req.body;
    const created_at = Date.now();
    var query = 'INSERT INTO `dev_news` (id, type, title, text, created_at) VALUES (NULL, ?, ?, ?, ?)';

    connection.query(query, [type, title, text, created_at], (error, results) => {
        if (error) {
            console.error('${dateTime} データベースへの保存エラー:', error);
            return res.status(500).send('データベースエラー');
        }
        res.status(200).send('アップロード成功');
    });
});

router.delete('/delete/dev_news/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM dev_news WHERE id = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('データベースへの保存エラー:', error);
            return res.status(500).send('データベースエラー');
        }
        res.status(200).send('削除成功');
    });
});

router.get("/api/dev_news", (req, res) => {
    connection.query(
        "SELECT id, type, title, text, created_at FROM dev_news;",
        (error, results) => {
            res.send(results);
        }
    );
});

module.exports = router;