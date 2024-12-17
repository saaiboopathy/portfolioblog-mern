import React from "react";
import project1 from "../assets/Project1.jpeg";
import project2 from "../assets/Project2.jpeg";

const projects = [
    {
        id: 1,
        title: "Weather App",
        description: "The Weather Report app allows users to get real-time weather updates for any city. By entering a city name, users can view key details such as weather conditions, temperature, and a brief description. The app fetches data from OpenWeatherMap, offering a simple and intuitive interface to stay informed about current weather conditions.",
        image: project1,
        liveLink: "https://weatherapp-nu-six.vercel.app/",
        repoLink: "https://github.com/saaiboopathy/Weatherapp",
    },
    {
        id: 2,
        title: "Todo List application built with React",
        description: "A simple React-based Todo List app where users can add, view, and delete activities. It features components for adding tasks, displaying them, and handling deletions, with state management using React's useState hook for real-time updates.",
        image: project2,
        liveLink: "https://acttodo-olive.vercel.app/",
        repoLink: "https://github.com/saaiboopathy/Acttodo",
    },
    {
        id: 3,
        title: "Portfolio Blogging Platform",
        description: "In Progress",
        image: "",
        liveLink: "",
        repoLink: "",
    },
];

function Projects() {
    return (
        <div className="py-16 bg-gray-100">

            <div className="text-center mt-10">
                <h1 className="text-4xl font-bold text-gray-800">Projects</h1>
                <p className="mt-4 text-lg text-gray-600">A collection of some of my recent work.</p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">

                {projects.map((project) => (
                    <div key={project.id} className="bg-white shadow-md rounded-md overflow-hidden">
                        <div className="relative">
                            {project.image && (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            {/* Add a dark overlay for better text visibility if the image exists */}
                            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                        </div>

                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-800">{project.title}</h2>
                            <p className="mt-2 text-gray-600">{project.description}</p>
                            <div className="mt-4 flex gap-4">
                                {project.liveLink && (
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        Live Demo
                                    </a>
                                )}
                                {project.repoLink && (
                                    <a
                                        href={project.repoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
                                    >
                                        View Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Projects;
