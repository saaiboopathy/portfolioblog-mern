const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
require('dotenv').config();

const app = express();

// CORS Configuration for Vercel Frontend
const corsOptions = {
    origin: 'https://saai-boopathys-projects.vercel.app', // Vercel Frontend URL
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
};

// Use the CORS middleware with the above options
app.use(cors(corsOptions));

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
}).then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

// Schema
const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: String,
    likes: { type: Number, default: 0 },
});

// Model
const Blog = mongoose.model('Blog', blogSchema);

// Get all blogs
app.get('/api/blogs', async (req, res) => {
    try {
        const allBlog = await Blog.find();
        res.status(200).json(allBlog);
    } catch (err) {
        res.status(400).json({ message: "Error fetching Blogs", error: err.message });
    }
});

// Increment likes on a blog
app.patch('/api/blogs/like/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );

        res.json(updatedBlog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new blog
app.post('/api/blogs', async (req, res) => {
    const newBlogPost = new Blog({
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
        likes: req.body.likes,
    });

    try {
        const savedBlog = await newBlogPost.save();
        res.status(200).json(savedBlog);
    } catch (err) {
        res.status(400).json({ message: "Error saving the blog", error: err.message });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`The server is running in port ${port}`);
});
