const mysql = require("mysql2");
const express = require("express");
var cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "school",
    password: "123",
    port: "3308"
});

db.connect(function (err) {
    if (err) {
        throw err;
    } else {
        //  Авторизация администраторв
        app.get('/admin', async (req, res) => {
            console.log("/admin");
            db.query('SELECT * FROM `admin`', function (err, response, fields) {
                if (err) throw err;
                res.send(response);
            });
        });
        // Авторизация учителя
        app.post('/teacher', async (req, res) => {
            console.log("/teacher");
            // Данные с клиента
            let login = req.body.login;
            let password = req.body.password;
            // Ответ на запрос
            let resultRequest = {
                res: false
            };
            db.query("SELECT * FROM `teachers` WHERE login=(?)", [login], function (err, result) {
                if (err) throw err;
                // Данные с БД
                let loginDB;
                let passwordDB;
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    loginDB = row.login;
                    passwordDB = row.password;
                });
                // Проверка данных
                if (login == loginDB && password == passwordDB) {
                    resultRequest.res = true;
                } else {
                    resultRequest.res = false;
                }
                res.send(resultRequest);
            });
        });
        // Авторизация ученика
        app.post('/student', async (req, res) => {
            console.log("/teacher");
            // Данные с клиента
            let login = req.body.login;
            let password = req.body.password;
            // Ответ на запрос
            let resultRequest = {
                res: false
            };
            db.query("SELECT * FROM `students` WHERE login=(?)", [login], function (err, result) {
                if (err) throw err;
                // Данные с БД
                let loginDB;
                let passwordDB;
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    loginDB = row.login;
                    passwordDB = row.password;
                });
                // Проверка данных
                if (login == loginDB && password == passwordDB) {
                    resultRequest.res = true;
                } else {
                    resultRequest.res = false;
                }
                res.send(resultRequest);
            });
        });

        // Данные

        // Получение списка учителей
        app.get('/teachers', async (req, res) => {
            console.log("/teachers");
            db.query('SELECT * FROM `teachers`', function (err, response, fields) {
                if (err) throw err;
                res.send(response);
            });
        });

        // Получение списка учеников
        app.get('/students', async (req, res) => {
            console.log("/students");
            db.query('SELECT * FROM `students`', function (err, response, fields) {
                if (err) throw err;
                res.send(response);
            });
        });

        // Добавить учителя
        app.post('/add/teacher', async (req, res) => {
            console.log("/add/teacher");
            let login = req.body.login;
            let password = req.body.password;
            let fio = req.body.fio;
            let items = req.body.items;

            db.query('INSERT INTO teachers(login, password, fio, items) VALUES (?, ?, ?, ?)', [login, password, fio, items], function (err, response, fields) {
                if (err) throw err;
                res.send(response);
            });
        });

        // Добавить студента
        app.post('/add/student', async (req, res) => {
            console.log("/add/student");
            let login = req.body.login;
            let password = req.body.password;
            let fio = req.body.fio;
            let parents = req.body.parents;
            let phone = req.body.phone;
            let note = req.body.note;

            db.query('INSERT INTO students(login, password, fio, parents, phone, note) VALUES (?, ?, ?, ?, ?, ?)', [login, password, fio, parents, phone, note], function (err, response, fields) {
                if (err) throw err;
                res.send(response);
            });
        });
        // Редактировать учителя
        app.post('/edit/teacher', async (req, res) => {
            console.log("/edit/teacher");
            let id = req.body.id;
            let login = req.body.login;
            let password = req.body.password;
            let fio = req.body.fio;
            let items = req.body.items;

            console.log(req.body);

            db.query("UPDATE teachers SET login = (?), password = (?), fio = (?), items = (?) WHERE id=(?)", [login, password, fio, items, id], function (err, results, fields) {
                if (err) throw err;
                res.send(results);
            });
        });

        // Редактировать ученика
        app.post('/edit/student', async (req, res) => {
            console.log("/edit/student");
            let id = req.body.id;
            let login = req.body.login;
            let password = req.body.password;
            let fio = req.body.fio;
            let parents = req.body.parents;
            let phone = req.body.phone;
            let note = req.body.note;

            console.log(req.body);

            db.query("UPDATE students SET login = (?), password = (?), fio = (?), parents = (?), phone = (?), note = (?) WHERE id=(?)", [login, password, fio, parents, phone, note, id], function (err, results, fields) {
                if (err) throw err;
                res.send(results);
            });
        });

        app.post('/delete/teacher', async (req, res) => {
            console.log("/delete/teacher");
            db.query("DELETE FROM teachers WHERE id IN (?)", [req.body], function (err, results, fields) {
                if (err) throw err;
                res.send(results);
            });
        });

        app.post('/delete/student', async (req, res) => {
            console.log("/delete/student");
            db.query("DELETE FROM students WHERE id IN (?)", [req.body], function (err, results, fields) {
                if (err) throw err;
                res.send(results);
            });
        });

    }
});

app.listen(3000);
