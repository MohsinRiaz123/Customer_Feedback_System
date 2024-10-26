import React, { useState } from "react";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import img from '../assets/reset.jpg'

const ResetInputs = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConPasswordVisibility = () => {
    setShowConPassword((prev) => !prev);
  };

  const validatePassword = () => {
    const newErrors = {};
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.passwordLength = "Password must be at least 6 characters long.";
    } else if (!passwordRegex.test(password)) {
      newErrors.passwordMix = "Password must contain a mix of letters, numbers, and special characters.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const goForConreset = (event) => {
    event.preventDefault();
    const validationErrors = validatePassword();

    if (Object.keys(validationErrors).length === 0) {
      navigate("/resetconfirmation");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className=" w-[350px] lg:w-full  text-blue-400 bg-white flex">
      <div className="hidden lg:block w-1/2 flex justify-center items-center">
        <img src={img} alt="login" />
      </div>
      <div className="w-full lg:w-1/2 px-10 my-auto ">
        <div  className="mt-20 lg:mt-0">
          <h2 className="font-semibold text-center text-lg lg:text-2xl ">
            Reset Password
          </h2>
        </div>
        <div className="space-y-2 mb-2 mt-5">
          <p className="font-bold text-2xl">
            Reset
            <br />
            password?
          </p>
          <h5 className="text-sm">
            Set up your new password and don’t share it with anyone to keep your account safe.
          </h5>
        </div>
        <form
          onSubmit={goForConreset}
          className="text-base lg:text-sm  space-y-6"
        >
          <div className="flex flex-col space-y-1 mt-6">
            <label className="font-semibold flex items-center gap-2">
              <IoLockClosedOutline />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className={`w-full border-solid border py-2 rounded-lg border-blue-400 px-5 outline-none ${errors.password || errors.passwordLength || errors.passwordMix ? 'border-red-500' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            {errors.passwordLength && <p className="text-red-500 text-sm">{errors.passwordLength}</p>}
            {errors.passwordMix && <p className="text-red-500 text-sm">{errors.passwordMix}</p>}
          </div>
          <div className="flex flex-col space-y-1">
            <label className="font-semibold flex items-center gap-2">
              <IoLockClosedOutline />
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter your password"
                className={`w-full border-solid border py-2 rounded-lg border-blue-400 px-5 outline-none ${errors.confirmPassword ? 'border-red-500' : ''}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={toggleConPasswordVisibility}
              >
                {showConPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <div className="flex flex-col justify-center items-center mt-4">
            <button
              type="submit"
              className="mx-auto w-[60%] md:w-[75%] lg:w-3/6 border-solid border rounded-lg text-white bg-blue-400 py-1 px-5 text-base lg:text-md"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetInputs;
