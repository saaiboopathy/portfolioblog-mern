import { signInWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import auth from "../config/firebase"

function Login() {
    const navigate = useNavigate()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [err, seterr] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0)
        auth.onAuthStateChanged(function (user) {
            if (user) {
                navigate('/home')
            }
        })
    },[])

    const handleuser = (event) => {
        setemail(event.target.value)
    }

    const handlepass = (event) => {
        setpassword(event.target.value)
    }

    const handleLogin = (e) => {
        e.preventDefault();

        // Simulate login process
        console.log('User logged in:', { email, password });
        signInWithEmailAndPassword(auth, email, password).then((res) => {
            console.log("login success", res)
            navigate('/home');
        }).catch(() => {
            seterr("Login Failed")
        })


    }


    return (
        <div className="flex justify-center h-screen  items-center " style={{ backgroundColor: "#edebe4" }}>
            <form onSubmit={handleLogin} style={{ width: "70%" }} className="border rounded-xl shadow-xl bg-white" >
                <div className="p-6 flex gap-10 flex-col border rounded-md   ">
                    <div className="flex flex-col gap-3 flex-wrap">
                        <label className="text-black font-semibold text-xl">Email:</label>
                        <input type="text"
                            onChange={handleuser}
                            className="w-2/5 border rounded-lg p-2"
                            placeholder="Enter your Email :"></input>
                    </div>

                    <div className="flex flex-col gap-3 flex-wrap">
                        <label className="text-black font-semibold text-xl">Password:</label>
                        <input type="text"
                            onChange={handlepass}
                            className="w-2/5 border rounded-lg p-2"
                            placeholder="Enter your Password :"></input>
                    </div>

                    <p className="text-red-400 font-bold cursor-pointer my-2">{err}</p>

                    <div className="flex gap-10 items-center ">
                        <button className="bg-black text-white p-2 border border-none rounded-md hover:bg-red-600 hover:text-white hover:font-extrabold">Login</button>
                        <p onClick={() => { navigate('/signup') }} className="text-black font-bold cursor-pointer my-2 hover:underline">New user ? Please click here to register</p>

                    </div>
                </div>


            </form>
        </div>
    )
}

export default Login
