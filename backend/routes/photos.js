const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const photosStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/photos');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const photosUpload = multer({ storage: photosStorage });

router.post('/upload/photos', photosUpload.single('image_name'), (req, res) => {
    const image_name = req.file.path;
    const { title, width, height, tags, created_by, created_by_id } = req.body;
    const created_at = Date.now();

    const query = 'INSERT INTO `gallery` (id, title, image_name, width, height, tags, created_by, created_by_id, created_at) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [title, image_name, width, height, tags, created_by, created_by_id, created_at], (error, results) => {
        if (error) {
            console.error('データベースへの保存エラー:', error);
            return res.status(500).send('データベースエラー');
        }
        res.status(200).send('アップロード成功');
    });
});

router.delete('/delete/photos/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM gallery WHERE id = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('データベースへの保存エラー:', error);
            return res.status(500).send('データベースエラー');
        }
        res.status(200).send('削除成功');
    });
});

router.get("/api/photos", (req, res) => {
    connection.query(
        "SELECT id, title, image_name, width, height, tags, created_by, created_by_id, created_at FROM gallery;",
        (error, results) => {
            res.send(results);
        }
    );
});

module.exports = router;