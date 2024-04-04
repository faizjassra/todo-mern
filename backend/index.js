import express from 'express'
import mongoose from 'mongoose'
import { mongoDBURI } from './mongodb.js'
import Todo from './models/Todo.js'
import 'dotenv/config'

const app = express()
app.use(express.json())

app.get('/todos', async (_, res) => {
    try {
        let todo = await Todo.find({})
        res.status(200).send(todo);
    } catch (error) {
        console.log('Error getting todos: ', error)
        res.status(500).json({ error: error.message })
    }
})

app.post('/add', async (req, res) => {
    const todo = req.body.todo

    try {
        const TodoData = await Todo.create({
            todo: todo
        })
        await TodoData.save()
        res.status(201).json({ TodoData })
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: "Server error" })
    }

})

app.put('/todos/:id', async (req, res) => {
    const { id } = req.params
    console.log("todo")
    try {
        const todo = await Todo.findByIdAndUpdate(id, req.body)
        console.log("Update Todo")
        if (todo === null) return res.status(404).json({ msg: "No todo with this id!" });
        let updateTodo = await Todo.findById(id);
        res.status(200).json(updateTodo)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.delete('/todos/:id', async (req, res) => {

    const { id } = req.params
    console.log(id)
    try {
        const todo = await Todo.findByIdAndDelete(id)
        if (todo === null) return res.status(404).send({ msg: "user not found" })

        res.status(200).send({ msg: "user deleted successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

app.listen(8000, () => {
    mongoose.connect(process.env.mongoDBURI)
        .then(() => console.log("mongoDB is connected"))
        .catch((e) => console.log(e.message))

    console.log("express is working at localhost:8000")
})

