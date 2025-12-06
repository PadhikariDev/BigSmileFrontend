import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bigS from '../assets/big_smile.jpg'
import logo from '../assets/bsLogo.png'
import smile from "../assets/happy.gif"
import loginImg from '../assets/loginPage.jpg'
import Popup from '../components/Popup'
import axios from "axios";
import { BeatLoader } from "react-spinners";


const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const API = import.meta.env.VITE_BACKEND_URL;


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await axios.post(`${API}/admin/login`, {
                username,
                password,
            });

            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard/home");
            } else {
                setShowPopup(true);
            }
        } catch (error) {
            console.error("Login error:", error.response?.data || error);
            setShowPopup(true);
        } finally {
            setIsLoading(false);
        }

        setUsername("");
        setPassword("");
    };

    return (
        <div
            className="min-h-screen w-full flex justify-center items-center font-sans relative"
            style={{
                backgroundImage: `url(${bigS})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Main Card */}
            <div className="
    relative z-10 w-[90%] max-w-5xl h-auto lg:h-[75vh]
    flex flex-col lg:flex-row 
    rounded-2xl shadow-2xl overflow-hidden bg-[#EEEEEE]
">

                {/* LEFT IMAGE — HIDDEN ON SMALL SCREENS */}
                <div className="hidden lg:block lg:w-[50%] h-full">
                    <img
                        src={loginImg}
                        alt="Big Smile Dental Clinic"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* RIGHT SIDE */}
                <div className="w-full lg:w-[50%] flex flex-col justify-center items-center p-8 lg:p-10">

                    <img src={logo} alt="Logo" className="w-20 h-20 mb-4" />

                    <h1 className="text-center font-bold tracking-tight text-[#070a09]
            text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
                        Big{" "}
                        <span className="text-transparent font-extrabold [-webkit-text-stroke:2px_#ff860d]">
                            Smile
                        </span>{" "}
                        Dental
                    </h1>

                    <div className="flex items-center justify-center mb-8">
                        <p className="text-center italic text-[#070a09] text-lg md:text-xl leading-snug max-w-md">
                            Make your smile big.
                        </p>
                        <img
                            src={smile}
                            alt="Smile"
                            className="w-8 h-8 ml-2 mix-blend-multiply"
                        />
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-5">

                        {/* FIXED INPUTS WITH ID + NAME */}
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="px-4 py-3 text-base rounded-md text-gray-800 border border-gray-300
                           focus:ring-2 focus:ring-[#e0a031] outline-none"
                            autoComplete="username"
                        />

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="px-4 py-3 text-base rounded-md text-gray-800 border border-gray-300
                           focus:ring-2 focus:ring-[#e0a031] outline-none"
                            autoComplete="current-password"
                        />

                        {/* ORIGINAL GRADIENT BUTTON + PRO HEIGHT + CENTERED */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="
                    mx-auto px-10 py-2.5 
                    text-lg font-medium text-[#fff8f0]
                    rounded-lg shadow-md cursor-pointer
                    bg-gradient-to-r from-[#FF8008] via-[#FFC837] to-[#FF8008]
                    bg-[length:200%_auto] bg-left
                    hover:bg-right transition-all duration-500 ease-in-out
                    hover:scale-[1.02] 
                    disabled:opacity-50 flex items-center justify-center gap-2
                "
                        >
                            {isLoading ? <BeatLoader size={10} color="#fff" /> : "Login"}
                        </button>
                    </form>
                </div>
            </div>

            {showPopup && (
                <Popup message="Incorrect username or password." onClose={() => setShowPopup(false)} />
            )}
        </div>
    );

}

export default Login
