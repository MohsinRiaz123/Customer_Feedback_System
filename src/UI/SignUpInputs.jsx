import React, { useState } from "react";
import { MdLockOutline } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { IoPersonOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import img from '../assets/signup.jpg'
const SignUpInputs = () => {
  const navigate = useNavigate();

  // State to hold form data and errors
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Check for first name
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required.";

    // Check for last name
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required.";

    // Check for email
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email address is invalid.";

    // Check for password
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    else if (formData.password.length < 5)
      newErrors.password = "Password must be at least 5 characters long.";
    else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    // Check for password confirmation
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Proceed with form submission (e.g., send data to server)
      console.log(formData);
      navigate("/");
    } else {
      setErrors(validationErrors);
    }
  };

  // Toggle functions for password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="  flex w-[350px] lg:w-[90%] bg-white ">
      <div className="hidden lg:block w-1/2 flex justify-center items-center">
        <img src={img} alt="login" />
      </div>
      <div className=" w-full lg:w-1/2 px-10  my-auto">
        <h1 className="text-2xl font-semibold text-center font-poppins text-blue-400 mt-20 lg:mt-0">
          Sign Up
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mt-5 lg:text-sm lg:px-4 text-blue-400"
        >
          <div className="space-y-1">
            <label
              htmlFor="firstName"
              className="font-semibold flex gap-1 items-center"
            >
              <CiUser />
              First Name
            </label>
            <div
              className={`rounded-lg border ${errors.firstName ? "border-red-500" : "border-blue-400"
                } p-2 w-full py-2 px-2 items-center`}
            >
              <input
                type="text"
                id="firstName"
                placeholder="Type your first name"
                className="outline-none px-3"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>
          <div className="space-y-1 mt-2 text-md">
            <label
              htmlFor="lastName"
              className="font-semibold flex items-center gap-1"
            >
              <CiUser />
              Last Name
            </label>
            <div
              className={`rounded-lg border ${errors.lastName ? "border-red-500" : "border-blue-400"
                } p-2 w-full items-center`}
            >
              <input
                type="text"
                id="lastName"
                placeholder="Type your last name"
                className="outline-none px-3"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
          <div className="space-y-1 mt-2">
            <label
              htmlFor="email"
              className="font-semibold flex gap-1 items-center"
            >
              <IoPersonOutline />
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Type your email"
              className={`rounded-lg border outline-none ${errors.email ? "border-red-500" : "border-blue-400"
                } p-2 w-full`}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="space-y-1 mt-3">
            <label
              htmlFor="password"
              className="font-semibold flex gap-1 items-center"
            >
              <MdLockOutline />
              Password
            </label>
            <div
              className={`rounded-lg border ${errors.password ? "border-red-500" : "border-blue-400"
                } p-2 w-full flex justify-between items-center`}
            >
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="w-full outline-none px-3"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <div
                className="px-2 text-lg cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="space-y-1 mt-2">
            <label
              htmlFor="confirmPassword"
              className="font-semibold flex gap-1 items-center"
            >
              <MdLockOutline />
              Confirm Password
            </label>
            <div
              className={`rounded-lg border ${errors.confirmPassword ? "border-red-500" : "border-blue-400"
                } p-2 w-full flex justify-between items-center`}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Re-enter your password"
                className="w-full outline-none px-3"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
              <div
                className="px-2 text-lg cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="flex justify-center">
            <div className="rounded-lg border py-1 w-4/6 mt-4 bg-blue-400 bg-cover bg-center lg:text-lg">
              <div className="text-center text-white">
                <button type="submit">Sign Up</button>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center mt-3">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-400">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <div className="flex justify-center">
            <div className="rounded-lg border border-blue-400 p-2 w-4/6 mt-2 text-center text-xs ">
              <p className="flex gap-2 items-center justify-center">
                <FcGoogle />
                Continue with Google
              </p>
            </div>
          </div>
          <div className="mt-2 text-center text-xs">
            <p className="text-gray-400">
              Already have an account?
              <span className="text-blue-400 pl-3">
                <Link to="/" className="font-semibold">
                  Log in
                </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpInputs;
