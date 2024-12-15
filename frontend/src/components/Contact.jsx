import React from 'react';
import resume from '../assets/Resume.pdf'

function Contact() {
    return (
        <div className="mt-10 flex flex-col items-center">
            <h1 className="font-bold text-2xl mb-6">Contact Me</h1>

            
            <form className="w-3/4 md:w-1/2 lg:w-1/3 flex flex-col gap-6">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="p-4 border-0 rounded-md bg-gray-100 focus:outline-none"
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    className="p-4 border-0 rounded-md bg-gray-100 focus:outline-none"
                />
                <textarea
                    placeholder="Your Message"
                    className="p-4 border-0 rounded-md bg-gray-100 h-32 focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-black text-white p-2 rounded-md hover:text-black hover:bg-white transition duration-500 ease-in-out font-bold"
                >
                    Send Message
                </button>
            </form>

            {/* Social Media Links */}
            <div className="mt-10 flex gap-6">
                <a
                    href="https://www.linkedin.com/in/saaiboopathy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl text-blue-600"
                >
                    <i className="fab fa-linkedin"></i> LinkedIn
                </a>
                <a
                    href="https://github.com/saaiboopathy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl text-gray-800"
                >
                    <i className="fab fa-github"></i> GitHub
                </a>
            </div>

            {/* Download Resume/CV */}
            <div className="mt-6">
                <a
                    href={resume}
                    download
                    className="bg-black text-white p-2 rounded-md hover:text-black hover:bg-white transition duration-500 ease-in-out font-bold"
                >
                    Download Resume
                </a>
            </div>
        </div>
    );
}

export default Contact;
