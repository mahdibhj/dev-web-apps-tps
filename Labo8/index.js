const express = require('express');
const app = express();
const PORT = 8000;
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

const tokens = [];
const users = [];

app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());

app.post('/users', (req, res) => {

    users.push({ 'username': req.body.username, 'password': req.body.password });
    res.sendStatus(201)
    console.log(req.body.username);
    console.log(req.body.password)
});

app.get('/login', (req, res) => {
    console.log("ABC");
    res.render('login');
    console.log("ABC2");
});

app.post('/login', (req, res) => {
  console.log("ABC3");
    const user = users.find((user) => user.username === req.body.username && user.password === req.body.password);
    if (user === undefined) {
        res.sendStatus(403)
    } else {
        const token = crypto.randomUUID();
        tokens.push({ username: user.username, token })
        res.send({ token })
    }
});

app.get('/', (req, res) => {
  console.log("QWERTY0");
    const token = req.cookies.awesome_cookie;
    const user = tokens.find((user) => user.token === token);
    const password = users.find((user) => user.username === user.username)?.password

    if (token === undefined || user === undefined) {
        console.log(token);
        console.log(user);
        res.redirect('/login');
        return
    }
    res.render('userprofile', { username: user.username, password: password })
});

app.listen(PORT, () => {
    console.log('Server listening at http://localhost:' + PORT)
});
