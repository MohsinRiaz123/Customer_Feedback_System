import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../assets/otp.jpg'
const OTPInput = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(60); // 2 minutes timer (120 seconds)
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    // Timer effect
    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(countdown);
        }
    }, [timer]);

    // Handle OTP input
    const handleInputChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Focus on the next input field if available
            if (index < otp.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        } else {
            e.target.value = "";
        }
    };

    // Handle OTP submission
    const handleSubmit = () => {
        navigate('/resetPassword');
    };

    // Resend OTP and reset timer
    const handleResend = () => {
        setOtp(["", "", "", ""]);
        setTimer(120);
        inputRefs.current[0].focus();
    };

    // Format time in mm:ss
    const formatTime = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className=" w-[350px] lg:w-full bg-white flex px-10">
            <div className="hidden lg:block w-1/2 flex justify-center items-center">
                <img src={img} alt="login" />
            </div>
            <div className="flex flex-col  items-center justify-center mx-auto text-blue-400">
                <h2 className="text-2xl font-semibold mb-4 mt-20 lg:mt-0 ">Enter OTP</h2>

                <div className="flex gap-4 mb-6">
                    {otp.map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={otp[index]}
                            onChange={(e) => handleInputChange(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    ))}
                </div>

                <div className="text-lg mb-4 flex items-center justify-center">
                    {timer > 0 ? `Time left: ${formatTime()}` : "Time's up!"}
                </div>
                <div className='flex items-center justify-start'>
                    {timer === 0 && (
                        <button
                            className="mb-10 text-blue-400"
                            onClick={handleResend}
                        >
                            Resend OTP
                        </button>
                    )}
                </div>

                <button
                    className={`px-6 py-2 mb-4 text-white text-lg rounded-lg ${otp.includes("") ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                    onClick={handleSubmit}
                    disabled={otp.includes("")}
                >
                    Submit OTP
                </button>
            </div>
        </div>
    );
}

export default OTPInput;
