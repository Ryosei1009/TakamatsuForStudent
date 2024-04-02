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

const accountStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/accounts');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const accountUpload = multer({ storage: accountStorage });

router.post('/upload/accounts/icon', accountUpload.single('icon_name'), (req, res) => {
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

router.post('/upload/accounts', accountUpload.single('icon_name'), (req, res) => {
    console.log(req.body)
    var { id, name, e_mail, naming, icon_name, grade, birthmonth, birthday, self_introduction, skill, hobby, url_1, url_2, url_3, url_4, role } = req.body;
    const update_at = Date.now();

    if (id === "undefined" || id === undefined) {
        naming = naming === undefined ? naming : "";
        var icon_name = "";
        grade = grade === undefined ? grade : "";
        birthmonth = birthmonth === undefined ? birthmonth : "";
        birthday = birthday === undefined ? birthday : "";
        self_introduction = self_introduction === undefined ? self_introduction : "";
        skill = skill === undefined ? skill : "";
        hobby = hobby === undefined ? hobby : "";
        url_1 = url_1 === undefined ? url_1 : "";
        url_2 = url_2 === undefined ? url_2 : "";
        url_3 = url_3 === undefined ? url_3 : "";
        url_4 = url_4 === undefined ? url_4 : "";
        role = 3;
        id = null;
        var query = 'INSERT INTO `account` (name, e_mail, naming, icon_name, grade, birthmonth, birthday, self_introduction, skill, hobby, url_1, url_2, url_3, url_4, role, update_at, id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    } else {
        var query = 'UPDATE account SET name = ?, e_mail = ?, naming = ?, icon_name = ?, grade = ?, birthmonth = ?, birthday = ?, self_introduction = ?, skill = ?, hobby = ?, url_1 = ?, url_2 = ?, url_3 = ?, url_4 = ?, role = ?, update_at = ? WHERE id = ?';
    }

    connection.query(query, [name, e_mail, naming, icon_name, grade, birthmonth, birthday, self_introduction, skill, hobby, url_1, url_2, url_3, url_4, role, update_at, id], (error, results) => {
        if (error) {
            console.error('${dateTime}[${req.path}] データベースへの保存エラー:', error);
            return res.status(500).send('データベースエラー');
        }
        res.status(200).send('アップロード成功');
    });
});

router.get("/api/accounts", (req, res) => {
    connection.query(
        "SELECT id, name, e_mail, icon_name, naming, grade, birthmonth, birthday, self_introduction, skill, hobby, url_1, url_2, url_3, url_4, role, update_at FROM account;",
        (error, results) => {
            res.send(results);
        }
    );
});

module.exports = router;