const express = require("express");
const todoControllers = require("../controllers/todo-controllers");
const router = express.Router()

router.get('/', todoControllers.getTodos)

router.post('/', todoControllers.createTodo)

module.exports = router