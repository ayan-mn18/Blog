import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Blog from './blogModel.js'



router.get('/', asyncHandler(async (req, res) => {
    const blog = await Blog.find({})
   
    res.json(blog)
})) 

//  Fetch a single Blog

router.get('/:id', asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(blog){
        res.json(blog)
    }
    else{
        res.status(404)
        throw new Error('Blog Not Found')
    }
}))


export default router