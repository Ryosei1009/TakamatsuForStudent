const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

router.post('/upload/event', (req, res) => {
    const { date, title, text, color, created_by, created_by_id } = req.body;
    const created_at = Date.now();
    var query = 'INSERT INTO `event` (id, date, title, text, color, created_by, created_by_id, created_at) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)';

    connection.query(query, [date, title, text, color, created_by, created_by_id, created_at], (error, results) => {
        if (error) {
            console.error('${dateTime} データベースへの保存エラー:', error);
            return res.status(500).send('データベースエラー');
        }
        res.status(200).send('アップロード成功');
    });
});

router.delete('/delete/event/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM event WHERE id = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('データベースへの保存エラー:', error);
            return res.status(500).send('データベースエラー');
        }
        res.status(200).send('削除成功');
    });
});

router.get("/api/event", (req, res) => {
    connection.query(
        "SELECT id, date, title, text, color, created_by, created_by_id, created_at FROM event;",
        (error, results) => {
            res.send(results);
        }
    );
});

module.exports = router;