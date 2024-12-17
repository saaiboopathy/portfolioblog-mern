import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import auth from "../../config/firebase";
import { signOut } from "firebase/auth";
import "./Navbar.css"
import React from "react";

function Navbar() {
    const navigate = useNavigate();

    const [log, setLog] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setLog(true);
            } else {
                setLog(false);
            }
        })
    }, []);

    const logOut = () => {
        signOut(auth).then(() => {
            navigate("/login");
        });
    }

    return (
        <div className='p-5 flex justify-between items-center font-bold text-xl bg-gray-800'>
            <h2 className='text-3xl font-bold text-white font-oswald'>Personal</h2>
            <div className='flex items-center'>
                <Link className='list-none px-5 text-gray-300 hover:text-white transition duration-200' to={"/home"}>Home</Link>
                <Link className='list-none px-5 text-gray-300 hover:text-white transition duration-200' to={"/blog"}>Blogs</Link>
                <Link className="list-none px-5 text-gray-300 hover:text-white transition duration-200" to={"/project"}>Projects</Link>
                <Link className='list-none px-5 text-gray-300 hover:text-white transition duration-200'>About</Link>
                <Link className='list-none px-5 text-gray-300 hover:text-white transition duration-200' to={'/contact'}>Contact</Link>
                {
                    log ? <button className='button-style hidden md:block' onClick={logOut}>Logout</button> 
                    : <button className='button-style hidden md:block' onClick={() => navigate("/login")}>Login</button>
                }
            </div>
        </div>
    )
}

export default Navbar;
