import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
    todo: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    status: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false
    },
    isCreated: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date()
    }
})
export default mongoose.model("todos", TodoSchema)