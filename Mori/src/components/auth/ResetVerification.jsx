import React from "react";
import { Link } from "react-router-dom";
import moriLogo from '../../assets/moriBlack.png'; 

export default function ResetPassword() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 ">

      <div className="fixed top-20 right-1/2 transform translate-x-1/2">
        <img src={moriLogo} alt="mori logo" className="text-6xl font-bold text-gray-700 w-40" />
      </div>
      <div className="w-96">
        <div className="bg-white w-80 sm:w-80 md:w-80 lg:w-90 xl:w-90 p-10 rounded-3xl sh gap-40 mx-auto">
            <h1 className="text-3xl pb-2.5 font-bold font-vietnam">Code has been sent.</h1>

            <form className="mt-0.1">
            
            {/* Description */}
            <p className=" text-sm text-gray-600">Enter your verification code.</p>

            {/* Email Field */}
            <form className="mt-4">
              <div className="flex flex-col items-start w-full">
                <label htmlFor="code" className="text-black text-base font-medium font-vietnam">Verification Code</label>
                  <input
                    type="code"
                    placeholder="Enter Verification Code"
                    className="w-full py-px pt-1 pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-gray placeholder:text-gray focus:outline-none text-gray placeholder:text-xs"
                  />
              </div>

              </form>

                {/* Login button */}
                <Link to="/setpassword">
                  <button 
                    type="button"
                    className="bg-zinc-500 hover:bg-zinc-700  text-white text-sm font-light font-vietnam py-2.5 px-7 rounded-xl mt-5 w-full"
                  >
                    CONFIRM
                  </button>
                </Link>
            </form>

            {/* Go back link */}
            <p className="text-center text-sm font-light text-gray-500 mt-4 font-vietnam">
              <span className="text-black">Not your email? </span>
              <br></br>
              <Link to="/resetpassword" className=" underline hover:text-gray-700">
                Go Back
              </Link>
            </p>
              
          </div>
        </div>
        
          {/* Footer */}
          <div className="absolute bottom-10 w-full text-center text-xs text-gray-600">
          © 2011-2024, XYZ | <Link to="/help" className="hover:underline">Help</Link>
        </div>
        
      </div>
  );
}