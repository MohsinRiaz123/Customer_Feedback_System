import React from "react";
import pic from '../assets/confirm.png'
import { useNavigate } from "react-router-dom";
import img from '../assets/success.jpg'
const ResetMassage = () => {
  const navigate = useNavigate();
  const goForLogin = () => {
    navigate("/");
  };
  return (
    <div className="flex w-[350px] lg:w-full  bg-white  text-blue-400 ">
      <div className="hidden lg:block w-1/2 flex justify-center items-center">
        <img src={img} alt="login" />
      </div>
      <div className="w-full lg:w-1/2 px-4 my-auto ">
        <div  className="mt-20 lg:mt-0">
          <h2 className="font-bold text-center text-2xl  ">
            Reset Successful
          </h2>
        </div>
        <div className="  mt-8 w-[150px] h-[150px]  mx-auto ">
          <img src={pic}></img>
        </div>
        <div className="space-y-2  my-auto  ">
          <p className="font-bold text-center text-sm md:text-xl">
            Password successfully reset
          </p>
          <h5 className="text-sm text-center">
            Your password has been successfully reset, Please login again to
            continue.
          </h5>
        </div>
        <div className=" flex flex-col justify-center items-center mt-6 ">
          <button
            onClick={() => goForLogin()}
            className=" w-60 border-solid border  rounded-lg text-white  bg-blue-400 py-1 px-5"
          >
            Login Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetMassage;
