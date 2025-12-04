import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bigS from '../assets/big_smile.jpg'
import logo from '../assets/bsLogo.png'
import loginImg from '../assets/loginPage.jpg'
import Popup from '../components/Popup'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showPopup, setshowPopup] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (data.success) {
                navigate("/dashboard/home");
            } else {
                setshowPopup(true);
            }
        } catch (error) {
            console.error("Login error:", error);
            setshowPopup(true);
        }

        setUsername("");
        setPassword("");
    };

    return (
        <div
            className="h-screen w-screen flex justify-center items-center font-sans relative"
            style={{
                backgroundImage: `url(${bigS})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black/50"></div>

            <div className=" relative z-10 w-3/4 h-3/4 flex justify-center items-center rounded-lg shadow-2xl bg-[#EEEEEE]">
                <div className="w-1/2 h-full flex justify-center items-center rounded-lg">
                    <img
                        src={loginImg}
                        alt="Big Smile Dental Clinic"
                        className="w-full h-full object-cover rounded-tl-lg rounded-bl-lg"
                    />
                </div>
                <div className="w-1/2 h-full rounded-lg flex flex-col justify-center items-center p-8">
                    <img src={logo} alt="Logo" className="w-20 h-20 mb-4" />
                    <h1 className="text-center font-bold tracking-tight text-[#070a09] 
               text-[36px] md:text-[48px] lg:text-[56px] 
               leading-tight mb-4 whitespace-nowrap">
                        Big{" "}
                        <span className="text-transparent font-extrabold [-webkit-text-stroke:2px_#ff860d]">
                            Smile
                        </span>{" "}
                        Dental
                    </h1>
                    <p className="text-center  font-base italic text-[#070a09] text-[18px] md:text-[20px] lg:text-[22px] leading-snug max-w-2xl mx-auto mb-8">
                        A healthy smile is a happy smile.
                    </p>
                    <form onSubmit={handleSubmit} className="w-3/4 flex flex-col gap-5">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="px-4 py-2 text-base rounded-md text-gray-800 outline-none border border-gray-300 focus:ring-2 focus:ring-[#e0a031]"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="px-4 py-2 text-base rounded-md text-gray-800 outline-none border border-gray-300 focus:ring-2 focus:ring-[#e0a031]"
                        />
                        <button
                            type="submit"
                            className="w-1/2 mx-auto py-3 px-10 text-lg font-medium text-[#fff8f0]
                             rounded-lg shadow-md 
                            bg-gradient-to-r from-[#FF8008] via-[#FFC837] to-[#FF8008] 
                             bg-[length:200%_auto] bg-left transition-all duration-500 ease-in-out hover:bg-right cursor-pointer"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
            {showPopup && (
                <Popup message="Incorrect username or password." onClose={() => setshowPopup(false)} />
            )}
        </div>
    )
}

export default Login
