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

const newsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/news');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const newsUpload = multer({ storage: newsStorage });

router.post('/upload/news', newsUpload.single('image_1'), (req, res) => {
  const image_1 = req.file.path;
  const { title, text, created_by, created_by_id } = req.body;
  const created_at = Date.now();

  const query = 'INSERT INTO `news` (id, title, text, image_1, created_by, created_at, created_by_id) VALUES (NULL, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [title, text, image_1, created_by, created_at, created_by_id], (error, results) => {
    if (error) {
      console.error('データベースへの保存エラー:', error);
      return res.status(500).send('データベースエラー');
    }
    res.status(200).send('アップロード成功');
  });
});

router.delete('/delete/news/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM news WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error('データベースへの保存エラー:', error);
      return res.status(500).send('データベースエラー');
    }
    res.status(200).send('削除成功');
  });
});

router.get("/api/news", (req, res) => {
  connection.query(
    "SELECT id, title, text, image_1, created_by, created_at, created_by_id FROM news;",
    (error, results) => {
      if (error) {
        console.error('データベースエラー:', error);
        return res.status(500).send('データベースエラー');
      }
      res.send(results);
    }
  );
});

module.exports = router;