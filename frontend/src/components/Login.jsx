import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../config/firebase";

function Login() {
    const navigate = useNavigate();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [err, seterr] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        auth.onAuthStateChanged(function (user) {
            if (user) {
                navigate('/home');
            }
        });
    }, []);

    const handleuser = (event) => {
        setemail(event.target.value);
    };

    const handlepass = (event) => {
        setpassword(event.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Simulate login process
        console.log('User logged in:', { email, password });
        signInWithEmailAndPassword(auth, email, password).then((res) => {
            console.log("login success", res);
            navigate('/home');
        }).catch(() => {
            seterr("Login Failed");
        });
    };

    return (
        <div className="flex justify-center h-screen items-center bg-gray-100">
            <form onSubmit={handleLogin} className="w-full max-w-lg border rounded-xl shadow-lg bg-white p-8">
                <div className="flex flex-col gap-6">
                    <h2 className="text-center text-2xl font-semibold text-gray-800">Login</h2>

                    {/* Email Input */}
                    <div className="flex flex-col gap-3">
                        <label className="text-black font-semibold text-lg">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleuser}
                            className="w-full border rounded-lg p-3 text-gray-700"
                            placeholder="Enter your Email"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col gap-3">
                        <label className="text-black font-semibold text-lg">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlepass}
                            className="w-full border rounded-lg p-3 text-gray-700"
                            placeholder="Enter your Password"
                            required
                        />
                    </div>

                    {/* Error Message */}
                    <p className="text-red-500 font-semibold text-center">{err}</p>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4 items-center">
                        <button
                            type="submit"
                            className="bg-black text-white p-3 w-full rounded-md hover:bg-red-600 hover:text-white transition duration-300"
                        >
                            Login
                        </button>

                        <p onClick={() => { navigate('/signup') }} className="text-center text-gray-600 cursor-pointer hover:underline">
                            New user? Please click here to register
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
