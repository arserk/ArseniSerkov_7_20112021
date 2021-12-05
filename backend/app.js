const express = require('express');
const path = require('path');
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');

//Database
const db = require('./config/database');

//Connection test
db.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error' + err))

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//routes
app.use(express.json({ limit: '2MB' }));
app.use(express.urlencoded({ limit: '2MB', extended:false }));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/user', userRoutes);
app.use('/post', postsRoutes);
app.use('/comment', commentsRoutes);

module.exports = app;