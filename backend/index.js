const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require("mysql2");
require('dotenv').config()

const app = express();
const port = 8000;
app.use(`/images`, express.static(`images`));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('Database connection has success');
});

const newsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/news');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const newsUpload = multer({ storage: newsStorage });

app.post('/upload/news', newsUpload.single('image_1'), (req, res) => {
  const image_1 = req.file.path;
  const { title, text, created_by } = req.body;
  const created_at = Date.now();

  const query = 'INSERT INTO `news` (id, title, text, image_1, created_by, created_at) VALUES (NULL, ?, ?, ?, ?, ?)';
  connection.query(query, [title, text, image_1, created_by, created_at], (error, results) => {
    if (error) {
      console.error('データベースへの保存エラー:', error);
      return res.status(500).send('データベースエラー');
    }
    res.status(200).send('アップロード成功');
  });
});

const accountStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/accounts');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const accountUpload = multer({ storage: accountStorage });

app.post('/upload/accounts/icon', accountUpload.single('icon_name'), (req, res) => {
  const icon_name = req.file.path;
  var { id } = req.body;
  const update_at = Date.now();
  var query = 'UPDATE account SET icon_name = ?, update_at = ? WHERE id = ?';

  connection.query(query, [icon_name, update_at, id], (error, results) => {
    if (error) {
      console.error('データベースへの保存エラー:', error);
      return res.status(500).send('データベースエラー');
    }
    res.status(200).send('アップロード成功');
  });
});

app.post('/upload/accounts', accountUpload.single('icon_name'), (req, res) => {
  var { id, name, e_mail, naming, icon_name, grade, self_introduction, skill, hobby, url_1, url_2, url_3, url_4, role } = req.body;
  const update_at = Date.now();
  console.log(req.body)

  if (id === "undefined" || id === undefined) {
    naming = naming ? naming : "";
    var icon_name = "";
    grade = grade ? grade : "";
    self_introduction = self_introduction ? self_introduction : "";
    skill = skill ? skill : "";
    hobby = hobby ? hobby : "";
    url_1 = url_1 ? url_1 : "";
    url_2 = url_2 ? url_2 : "";
    url_3 = url_3 ? url_3 : "";
    url_4 = url_4 ? url_4 : "";
    role = 3;
    id = null;
    var query = 'INSERT INTO `account` (name, e_mail, naming, icon_name, grade, self_introduction, skill, hobby, url_1, url_2, url_3, url_4, role, update_at, id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  } else {
    var query = 'UPDATE account SET name = ?, e_mail = ?, naming = ?, icon_name = ?, grade = ?, self_introduction = ?, skill = ?, hobby = ?, url_1 = ?, url_2 = ?, url_3 = ?, url_4 = ?, role = ?, update_at = ? WHERE id = ?';
  }

  connection.query(query, [name, e_mail, naming, icon_name, grade, self_introduction, skill, hobby, url_1, url_2, url_3, url_4, role, update_at, id], (error, results) => {
    if (error) {
      console.error('データベースへの保存エラー:', error);
      return res.status(500).send('データベースエラー');
    }
    res.status(200).send('アップロード成功');
  });
});

app.get("/api/news", (req, res) => {
  connection.query(
    "SELECT id, title, text, image_1, created_by, created_at FROM news;",
    (error, results) => {
      console.log(results);
      res.send(results);
    }
  );
});

app.get("/api/accounts", (req, res) => {
  connection.query(
    "SELECT id, name, e_mail, icon_name, naming, grade, self_introduction, skill, hobby, url_1, url_2, url_3, url_4, role, update_at FROM account;",
    (error, results) => {
      console.log(results);
      res.send(results);
    }
  );
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});