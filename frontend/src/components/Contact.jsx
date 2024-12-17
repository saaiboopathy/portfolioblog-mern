import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create form data
        const formData = {
            name,
            email,
            message
        };

        try {
            const response = await axios.post('https://portfolioblog-mern.onrender.com/api/contact', formData);
            setResponseMessage('Message sent successfully!');
        } catch (error) {
            setResponseMessage('Error sending message, please try again later.');
        }

        // Reset form fields
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="flex flex-col items-center mt-10 bg-gray-900 text-white py-10">
            <h1 className="text-3xl font-semibold mb-8">Contact Me</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-4 mb-4 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-4 mb-4 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full p-4 mb-4 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="6"
                ></textarea>
                <button
                    type="submit"
                    className="w-full p-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300"
                >
                    Send
                </button>
            </form>
            <p className="mt-6 text-xl italic">{responseMessage}</p>
        </div>
    );
}

export default Contact;
