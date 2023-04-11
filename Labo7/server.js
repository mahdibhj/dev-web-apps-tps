const express = require('express');
const uuid = require('uuid');
const cors = require('cors');
const app = express();
const PORT = 8000;

const users = {};

app.use(cors());

app.use((req, res, next) => {
    res.header("Content-Type", 'text/html');
    next();
});

app.use(express.json());

app.get('/', (req, res) => {
    console.log('up');
    res.send("I'm up!!");
});

app.post('/users', (req, res) => {
    const id = uuid.v4();
    users[id] = [];
    console.log('new user connecting')
    res.send({ id });
});

app.get('/:userId/tasks', (req, res) => {
    console.log("I'm here 0");
    const tasks = users[req.params.userId];
    res.send({ tasks })
});

app.post('/:userId/tasks/', (req, res) => {
    if (!req.body.name || req.body.name === "") {
        console.log("I'm here 1");
        res.sendStatus(400)
    } else {
        console.log("I'm here 2");
        const task = {...req.body, id: uuid.v4() }
        users[req.params.userId].push(task)
        res.send(task);
    }
});


app.put('/:userId/tasks/:taskId', (req, res) => {
    if (!(users[req.params.userId].some(task => task.id == req.params.taskId)) || !req.body.name || req.body.name === "") {
        res.sendStatus(400);
    } else {
        const taskIndex = users[req.params.userId].findIndex(task => task.id == req.params.taskId)
        users[req.params.userId][taskIndex].name = req.body.name;
        res.send(users[req.params.userId][taskIndex]);
    }
});


app.delete('/:userId/tasks/:taskId', (req, res) => {
    if (!(users[req.params.userId].some(task => task.id == req.params.taskId))) {
        res.sendStatus(400);
    } else {
        users[req.params.userId] = users[req.params.userId].filter(task => task.id !== req.params.taskId);
        res.sendStatus(204)
    }
})






app.listen(PORT, () => {
    console.log('Server running at http://localhost:' + PORT + '');
});