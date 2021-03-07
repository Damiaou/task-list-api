require('babel-polyfill');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getHomes, getHome, createHome, deleteHome } = require('./home');
const { login, getUsers, getUser, createUser, deleteUser } = require('./user');
const { getTasks, getTask, createTask, deleteTask, getTasksForHome } = require('./task');
const {
	getHistoryForTaskForWeek,
	getHistoryForLastWeek,
	getHistories,
	getHistory,
	createHistory,
	deleteHistory,
} = require('./history');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.listen(process.env.PORT || 8080, () => {
	console.log('Started on (http://localhost:8080/) !');
});

// Warm welcome for all users
app.get('/', (req, res) => {
	res.send('<h2>Welcome to task list API</h2>');
});

// test

/**
 * ROUTING
 */
//        HOME
app.get('/home', getHomes);
app.get('/home/:hash', getHome);
app.post('/home', createHome);
app.delete('/home/:hash', deleteHome);

//        USER
app.get('/user', getUsers);
app.get('/user/:email', cors(), getUser);
app.post('/user', createUser);
app.delete('/user/:id', deleteUser);
app.post('/login', cors(), login);

//        TASK
app.get('/task', getTasks);
app.get('/taskForHome/:hash', getTasksForHome);
app.get('/task/:id', getTask);
app.post('/task', createTask);
app.delete('/task/:id', deleteTask);

//        HISTORY
app.get('/history', getHistories);
app.get('/history/:id', getHistory);
app.post('/history', createHistory);
app.delete('/history/:id', deleteHistory);
app.get('/historyForWeek/', getHistoryForLastWeek);
app.post('/historyForTask/', getHistoryForTaskForWeek);
