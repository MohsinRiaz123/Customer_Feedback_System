import React, { useState } from "react";
import { IoLockClosedOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye, MdOutlineVisibilityOff } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import img from '../assets/login.jpg'
const LoginInputs = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const goForLogin = (event) => {
    event.preventDefault();
    const Cemail = "mohsin.riaz338@gmail.com";
    const Cpass = "Mohsin@123";


    if (email === Cemail && password === Cpass) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full   bg-white flex">
      <div className="hidden lg:block w-1/2  p-[100px]">
        <img src={img} alt="login" className="" />
      </div>
      <div className="w-full lg:w-1/2 px-10 my-auto ">
        <div>
          <p className="font-semibold text-blue-400 text-center text-lg lg:text-2xl ">
            Log In
          </p>
        </div>
        <form
          action=""
          onSubmit={goForLogin}
          className="lg:mt-16 text-base lg:text-sm lg:px-16 text-blue-400"
        >
          <div className="flex flex-col space-y-2 mb-2 mt-5 py-3">
            <label className="font-semibold text-blue-400 flex items-center gap-2">
              <IoPersonOutline />
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Type your email"
              className=" border-2 py-2 rounded-lg border-blue-300  px-2 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="font-semibold text-blue-400 flex items-center gap-2">
              <IoLockClosedOutline />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="border-2 py-2 rounded-lg border-blue-300  px-2 outline-none w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute top-3 right-3 text-lg cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <MdOutlineRemoveRedEye /> : <MdOutlineVisibilityOff />}
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-center mt-2">{error}</div>
            )}
          </div>
          <Link to="/forgot" className="flex item
              justify-end text-blue-400 mt-4">Forget Password</Link>
          <div className="flex flex-col justify-center items-center mt-6 ">
            <button className="mx-auto w-[60%] md:w-[75%] lg:w-3/6 border-solid border rounded-lg text-white bg-blue-400 bg-cover bg-center py-1 px-2 text-base lg:text-md">
              Log In
            </button>
          </div>
          <div className="w-[70%] mx-auto flex items-center mt-5">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-400 font-semibold  ">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <div className="flex justify-center mt-4">
            <div className="rounded-lg border border-blue-300 border-2 p-2 w-3/6 mt-2 text-center text-xs lg:text-md">
              <p className="flex gap-2 items-center justify-center">
                <FcGoogle />
                Continue with Google
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center text-xs lg:text-md mt-6">
            <p className="text-gray-400">Don't have an account?</p>
            <Link to="/Signup" className=" px-2 font-semibold text-blue-400">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginInputs;
