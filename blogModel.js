import mongoose from 'mongoose'

const blogSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

const Blog = mongoose.model('Blog', blogSchema)

export default Blog