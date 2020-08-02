const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true 
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongoose: conexao padrao esta aberta');
});

db.on('error', err => {
    console.log(`Mongoose: deu erro na conexao padrao \n${err}`)
});

db.on('disconnected', () => {
    console.log('Mongoose: conexao padrao esta fechada');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log('Mongoose: disconectado por conta de um fechamento da aplicacao');
        process.exit(0);
    })
});

// load models
const Mentions = require('./models/mentions');

// load routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

const mentionsRoutes = require('./routes/mentions-routes');
app.use('/mentions', mentionsRoutes)

module.exports = app;