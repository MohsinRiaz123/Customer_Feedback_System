import React, { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import img from '../assets/forget.jpg'
const ForgotInputs = () => {
  const navigate = useNavigate();

  // State to hold form data and errors
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Proceed with form submission
      navigate("/emailsend");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="  flex text-blue-400  bg-white">
      <div className="hidden lg:block w-1/2 flex  items-center">
        <img src={img} alt="forget" />
      </div>
      <div className="w-full lg:w-1/2 px-10 my-auto ">
        <div>
          <h2 className="font-bold text-center text-2xl ">
            Forgot Password
          </h2>
        </div>
        <div className="space-y-2 mb-2 mt-10">
          <p className="font-bold text-2xl">
            Forgot
            <br />
            password?
          </p>
          <h5 className="text-sm">
            Enter your email details so we can help you reset your password
          </h5>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2 mb-2 mt-5">
            <label className="font-semibold flex items-center gap-2">
              <IoPersonOutline />
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Type your email"
              className={`w-full border-solid border py-2 rounded-lg border-blue-400 px-2 outline-none ${errors.email ? 'border-red-500' : ''}`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="flex flex-col justify-center items-center mt-10">
            <button
              type="submit"
              className="w-60 border-solid border rounded-lg text-white bg-blue-400 bg-cover bg-center py-1 px-5"
            >
              Send Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotInputs;
