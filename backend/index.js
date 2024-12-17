const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();
const nodemailer = require('nodemailer');

const app = express();

// CORS Configuration
const corsOptions = {
    origin: [
        'https://saai-boopathys-projects.vercel.app',  
        'https://portfolioblog-mern-48z8qp8lk-saai-boopathys-projects.vercel.app'
    ],
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// MongoDB Connections
const blogDB = mongoose.createConnection(process.env.MONGO_URI_BLOG, {
    serverSelectionTimeoutMS: 30000,
});
const contactDB = mongoose.createConnection(process.env.MONGO_URI_CONTACT, {
    serverSelectionTimeoutMS: 30000,
});

// Log Successful Connections
blogDB.once('open', () => console.log("Connected to Blog Database"));
contactDB.once('open', () => console.log("Connected to Contact Database"));

// Define Schemas and Models
const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: String,
    likes: { type: Number, default: 0 },
});
const Blog = blogDB.model('Blog', blogSchema);

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});
const Contact = contactDB.model('Contact', contactSchema);

// Routes for Blogs
app.get('/api/blogs', async (req, res) => {
    try {
        const allBlog = await Blog.find();
        res.status(200).json(allBlog);
    } catch (err) {
        res.status(400).json({ message: "Error fetching Blogs", error: err.message });
    }
});

app.post('/api/blogs', async (req, res) => {
    const newBlogPost = new Blog(req.body);
    try {
        const savedBlog = await newBlogPost.save();
        res.status(200).json(savedBlog);
    } catch (err) {
        res.status(400).json({ message: "Error saving blog", error: err.message });
    }
});

// Routes for Contact Form
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        // Save the contact message to the database
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // Send Email Notification
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: `New Contact Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Message sent successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Error saving contact message", error: err.message });
    }
});

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});
