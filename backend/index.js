const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mysql = require("mysql2");
require('dotenv').config();
const port = 443;
const { mw } = require("request-ip");
const fs = require('fs');
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
  res.header('Access-Control-Allow-Origin', 'https://www.takamatsu-ns.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
  mw();
});

const logFilePath = 'logs/logs.txt';
const shortLogFilePath = 'logs/shortLogs.txt';

app.use((req, res, next) => {
  const dateTime = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
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

const accountsRouter = require('./routes/account');
app.use('/', accountsRouter);

const devNewsRouter = require('./routes/dev_news');
app.use('/', devNewsRouter);

const eventRouter = require('./routes/event');
app.use('/', eventRouter);

const newsRouter = require('./routes/news');
app.use('/', newsRouter);

const photosRouter = require('./routes/photos');
app.use('/', photosRouter);

//サーバー起動
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});