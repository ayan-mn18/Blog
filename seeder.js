import blogs from './blogData.js'
import Blog from './blogModel.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './configDB.js'

dotenv.config()

connectDB()

const importData = async (Blog , blogs) => {
    try {
        await Blog.deleteMany()


        const sampleBlogs = blogs.map( blog => {
            return { ...blog }
        })

        await Blog.insertMany(sampleBlogs)
        console.log('Data Imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Blog.deleteMany()
        

        console.log('Data Destroyed!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}


export default importData