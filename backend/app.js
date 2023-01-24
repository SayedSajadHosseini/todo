const bodyParser = require('body-parser')
const express = require('express')
const { default: mongoose } = require('mongoose')
const router = require('./routes/todo-routes')

const app = express()
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    next()
})

app.use('/api/todo', router)

mongoose
    .connect('mongodb://127.0.0.1:27017/todo',)
    .then(() => {
        app.listen(3001)
    }).catch((err) => {
        console.log(err);
    })