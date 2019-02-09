const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const chatRoutes = require('./routes/chat');
const userRoutes = require('./routes/user');
const errorRoutes = require('./routes/error');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use(chatRoutes);

app.use(errorRoutes);

app.listen(8080);