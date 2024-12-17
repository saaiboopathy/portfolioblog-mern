import coverImage from '../assets/Cover2.jpeg';

function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section className="mt-10 flex items-center justify-center text-white h-screen text-center border-1 border-gray-800"
                style={{
                    backgroundImage: `url(${coverImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                }}>
                <div className="bg-black bg-opacity-60 p-6 rounded-md"> {/* Darker background overlay */}
                    <h1 className="text-4xl font-semibold font-oswald">Hi, I'm Saai Boopathy</h1>
                    <p className="mt-4 text-lg">A Full Stack Developer, MERN Stack in hand, just making things and figuring it out as I go.</p>
                    <a href="#projects" className="button-style mt-6 inline-block">See My Work</a>
                </div>
            </section>

            {/* About Me Section */}
            <section id="about" className="py-16 text-center bg-gray-900 text-white">
                <h2 className="text-3xl font-semibold">About Me</h2>
                <p className="mt-4 px-4 text-lg max-w-2xl mx-auto">
                    I'm a passionate developer learning the MERN stack. I love building dynamic web applications and am excited about learning new technologies.
                </p>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-16 bg-gray-800 text-center">
                <h2 className="text-3xl font-semibold text-white">Skills</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-8">
                    <div className="flex flex-col items-center">
                        <i className="fab fa-node fa-3x text-white"></i> {/* Node.js icon */}
                        <p className="mt-2 text-white">Node.js</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <i className="fab fa-js-square fa-3x text-white"></i> {/* JavaScript icon */}
                        <p className="mt-2 text-white">JavaScript</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <i className="fab fa-react fa-3x text-white"></i> {/* React icon */}
                        <p className="mt-2 text-white">React</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <i className="fab fa-node fa-3x text-white"></i> {/* Express icon */}
                        <p className="mt-2 text-white">Express</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <i className="fas fa-database fa-3x text-white"></i> {/* MongoDB icon */}
                        <p className="mt-2 text-white">MongoDB</p>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-16 text-center bg-gray-900 text-white">
                <h2 className="text-3xl font-semibold">Projects</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 px-4">
                    <div className="bg-gray-700 p-6 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold">Project 1</h3>
                        <p className="mt-2">A brief description of your project.</p>
                        <a href="https://github.com" className="button-style mt-4 inline-block">View on GitHub</a>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold">Project 2</h3>
                        <p className="mt-2">A brief description of your project.</p>
                        <a href="https://github.com" className="button-style mt-4 inline-block">View on GitHub</a>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold">Project 3</h3>
                        <p className="mt-2">A brief description of your project.</p>
                        <a href="https://github.com" className="button-style mt-4 inline-block">View on GitHub</a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
