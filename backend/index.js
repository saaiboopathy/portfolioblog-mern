
const express = require('express')
const cors = require('cors')

const bodyParser = require("body-parser")
const { default: mongoose } = require("mongoose")
require('dotenv').config();


const app = express()
app.use(bodyParser.json());
app.use(cors())

//Connecting MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.log(err);
});

//Connecting Schema
const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: String,
    likes: { type: Number, default: 0 }
})

//Model
const Blog = mongoose.model('Blog', blogSchema)

app.get('/api/blogs', async (req, res) => {
    try {

        const allblog = await Blog.find()
        res.status(200).json(allblog)
    }
    catch (err) {
        res.status(400).json({ message: "Error fetching Blogs", error: err.message })
    }

})


app.patch('/api/blogs/like/:id', async (req, res) => {
    try {
        // Step 1: Get the blog by ID from the database
        const blog = await Blog.findById(req.params.id);

        // Step 2: If the blog doesn't exist, send an error message
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Step 3: If the blog exists, increase the like count by 1
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,          // Use the blog ID from the URL
            { $inc: { likes: 1 } },  // Increment the likes by 1
            { new: true }            // Return the updated blog
        );

        // Step 4: Send the updated blog back to the frontend
        res.json(updatedBlog);
    } catch (err) {
        // Step 5: If something goes wrong, send an error message
        res.status(500).json({ message: err.message });
    }
});



app.post('/api/blogs', async (req, res) => {

    const newBlogPost = new Blog({
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
        likes: req.body.likes,

    })

    try {
        const savedBlog = await newBlogPost.save();
        res.status(200).json(savedBlog)
    }
    catch (err) {
        res.status(400).json(err.message)
    }

})




const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("The server is running in port 5000")
})