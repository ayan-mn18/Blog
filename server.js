import express from 'express'
import dotenv  from 'dotenv'
import mongoose from 'mongoose'
import blogRoutes from './blogRoutes.js'
import { notFound, errorHandler } from './errorMiddleware.js'
import connectDB from './configDB.js'
import ejs from 'ejs'
import blogs from './blogData.js'
import bodyParser from 'body-parser'
import Blog from './blogModel.js'
import multer from 'multer'
// import importData from './seeder.js'

// let blogz = Blog.find({});

// const blogFunction = async () =>{
// }


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null,  file.originalname )
    }
})



let filefilter = () =>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' )
    {
        cb(null,true);
    }else{
        return cb(null , false);
    }
}
   
const upload = multer({ storage: storage ,
    filefilter : filefilter
 })



dotenv.config()

// Database Connect Config  - - - - - - -- - -  - - - - - - -  - - - -- - - - - - - - - - - 

connectDB()

// Database Connect Config Ends  - - - - - - -- - -  - - - - - - -  - - - -- - - - - - - - - - - 

const app = express();

app.set('views' , './server/views')
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));
// app.use('*/images',express.static('public/images'));
app.use(express.static('public/images'));


// GET Home
app.get('/', async (req, res) => {

    res.render('index' , { blogsz : blogs });
})

app.get('/post' , (req,res) =>{
    res.render('post');
})

app.post('/post' , upload.single('file') , (req,res) =>{
    let blog =  {
        author : req.body.author,
        image : req.body.image,
        content : req.body.content,
        title : req.body.title
    }  ;
    // blog = Object.assign({} , blog , recentBlog)
    blogs.push(blog);
    
    // const sampleBlogs = blogs.map( blog => {
    //     return { ...blog }
    // })

    // Blog.insertMany(sampleBlogs)
    // console.log('Data Imported!')

    const importData = async (Blog , blogs) => {
        try {
            await Blog.deleteMany()
    
    
            const sampleBlogs = blogs.map( blog => {
                return { ...blog }
            })
    
            await Blog.insertMany(sampleBlogs)
            console.log('Data Imported!')
            // process.exit()
        } catch (error) {
            console.error(`${error}`)
            process.exit(1)
        }
    }

    importData(Blog , blogs) ;
    
    res.redirect('/')
    .then()
    
})

app.use('/api/blogs', blogRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`))