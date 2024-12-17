import { useEffect, useState } from "react";
import axios from "axios";
import auth from "../config/firebase";

function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        auth.onAuthStateChanged((user) => {
            if (user) {
                if (user.uid === 'DwUIH2NqKaWRQziqeDv0hAtrcCw2') {
                    console.log("He is Admin");
                    setAdmin(true);
                } else {
                    console.log("Not an Admin");
                    setAdmin(false);
                }
            } else {
                setAdmin(false);
            }
        });

        // Fetch blogs from backend
        axios.get("https://portfolioblog-mern.onrender.com/api/blogs")
            .then((res) => {
                setBlogs(res.data);
            })
            .catch((err) => {
                console.log("Error fetching data.", err);
            });
    }, []);

    // Function to handle liking a blog
    const handleLike = async (blogId) => {
        try {
            const response = await axios.patch(`https://portfolioblog-mern.onrender.com/api/blogs/like/${blogId}`);
            if (response.status === 200) {
                const updatedBlogs = await axios.get("https://portfolioblog-mern.onrender.com/api/blogs");
                setBlogs(updatedBlogs.data);
            }
        } catch (error) {
            console.log("Error liking the blogpost:", error);
        }
    };

    const handlenewBlogSubmit = (event) => {
        event.preventDefault();

        const today = new Date();
        const date = today.toISOString();
        const likes = 0;

        console.log("Sending Data:", { title, content, date, likes });

        axios.post("https://portfolioblog-mern.onrender.com/api/blogs", { title, content, date, likes })
            .then((res) => {
                console.log("Blog posted", res.data);
                axios.get("https://portfolioblog-mern.onrender.com/api/blogs")
                    .then((res) => {
                        setBlogs(res.data);
                    })
                    .catch((err) => {
                        console.log("Error fetching data from the blog", err);
                    });
            })
            .catch((err) => {
                console.log("Error posting the blog", err.response ? err.response.data : err);
            });

        setTitle('');
        setContent('');
    };

    return (
        <div className="mt-10 flex flex-col gap-5 items-center min-h-screen bg-gray-900 p-10">
            <h1 className="font-semibold text-3xl text-white">Latest blogs</h1>

            {admin && (
                <form onSubmit={handlenewBlogSubmit} className="flex flex-col w-3/5 gap-6">
                    <input
                        type="text"
                        placeholder="Enter the title"
                        className="p-4 bg-gray-800 text-white border-0 rounded-xl shadow-md"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Enter the content"
                        className="p-4 bg-gray-800 text-white border-0 rounded-xl h-52 shadow-md"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button
                        className="bg-black text-white p-2 border-0 rounded-md 
                        hover:bg-gray-700 hover:text-white 
                        transition duration-300 ease-in-out font-bold"
                    >
                        Add Blog
                    </button>
                </form>
            )}

            <div className="w-full">
                {blogs.length > 0 ? (
                    blogs.map((item, index) => (
                        <div key={item._id} className="w-3/5 mx-auto p-5 bg-gray-800 shadow-lg rounded-xl my-4">
                            <h2 className="text-2xl font-semibold text-white border-b pb-2 mb-4">
                                {index + 1}. {item.title}
                            </h2>
                            <h3 className="text-sm text-gray-400 mb-3">Published on: {item.date}</h3>
                            <p className="text-gray-300 mb-4">{item.content}</p>
                            <div className="flex grid-cols-2 gap-3 items-center justify-between">
                                <button
                                    className="flex items-center gap-1 font-semibold text-sm text-white p-1 rounded-md"
                                    onClick={() => handleLike(item._id)}
                                >
                                    <img
                                        src="https://cdn.jsdelivr.net/npm/heroicons@1.0.6/outline/thumb-up.svg"
                                        alt="Thumb Up"
                                        className="p-0.5 h-4 w-4 border border-white bg-gray-700 rounded-full"
                                    />
                                    Like
                                </button>
                                <span className="font-extralight text-xs text-gray-500">
                                    {item.likes} {item.likes === 1 ? 'Like' : 'Likes'}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No blogs yet.</p>
                )}
            </div>
        </div>
    );
}

export default Blog;
