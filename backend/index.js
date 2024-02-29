const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require("mysql2");
require('dotenv').config();
const app = express();
const port = 443;
const { mw } = require("request-ip");
const fs = require('fs');
const dateTime = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
app.use(`/images`, express.static(`images`));

//https接続にするための設定
const server = require('https').createServer({
  key: fs.readFileSync(process.env.KEY_PATH),
  cert: fs.readFileSync(process.env.CERT_PATH),
}, app)

//データベース接続
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

//データベース接続確認
connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('Database connection has success');
});

//CORS設定
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
  mw();
});

const logFilePath = 'logs/logs.txt';
const shortLogFilePath = 'logs/shortLogs.txt';

app.use((req, res, next) => {
  const logMessage = `
[${dateTime}]
  Request Details:
  Method: ${req.method}
  URL: ${req.originalUrl}
  Headers: ${JSON.stringify(req.headers)}
  Query Parameters: ${JSON.stringify(req.query)}
  Body: ${JSON.stringify(req.body)}
  Remote Address: ${req.ip}
  User Agent: ${req.get('User-Agent')}
---------------------------------------------
`;
  const shortLogMessage = `[${dateTime}] ${req.method} ${req.originalUrl} [${req.ip}]`;
  const fileShortLogMessage = `
[${dateTime}] ${req.method} ${req.originalUrl} [${req.ip}]`;

  console.log(shortLogMessage);

  fs.appendFile(shortLogFilePath, fileShortLogMessage, (err) => {
    if (err) {
      console.error('ログの書き込みエラー:', err);
    }
  });

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('ログの書き込みエラー:', err);
    }
  });
  next();
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

const photosStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/photos');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const photosUpload = multer({ storage: photosStorage });

app.post('/upload/photos', photosUpload.single('image_name'), (req, res) => {
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
      console.error('${dateTime}[${req.path}] データベースへの保存エラー:', error);
      return res.status(500).send('データベースエラー');
    }
    res.status(200).send('アップロード成功');
  });
});

app.post('/upload/accounts', accountUpload.single('icon_name'), (req, res) => {
  var { id, name, e_mail, naming, icon_name, grade, self_introduction, skill, hobby, url_1, url_2, url_3, url_4, role } = req.body;
  const update_at = Date.now();

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
      console.error('${dateTime}[${req.path}] データベースへの保存エラー:', error);
      return res.status(500).send('データベースエラー');
    }
    res.status(200).send('アップロード成功');
  });
});

app.delete('/delete/news/:id', (req, res) => {
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

app.get("/api/news", (req, res) => {
  connection.query(
    "SELECT id, title, text, image_1, created_by, created_at, created_by_id FROM news;",
    (error, results) => {
      res.send(results);
    }
  );
});

app.get("/api/accounts", (req, res) => {
  connection.query(
    "SELECT id, name, e_mail, icon_name, naming, grade, self_introduction, skill, hobby, url_1, url_2, url_3, url_4, role, update_at FROM account;",
    (error, results) => {
      res.send(results);
    }
  );
});

app.get("/api/photos", (req, res) => {
  connection.query(
    "SELECT id, title, image_name, width, height, tags, created_by, created_by_id, created_at FROM gallery;",
    (error, results) => {
      res.send(results);
    }
  );
});

//サーバー起動
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});