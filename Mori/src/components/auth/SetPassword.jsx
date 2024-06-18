import React, { useState, useEffect }  from "react";
import { Link , useLocation, useNavigate } from "react-router-dom";
import moriLogo from '../../assets/moriBlack.png'; 
import axios from "axios"; 

import { setPass } from "../../service/auth";
import { validateToken } from "../../service/auth";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);



  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const urlToken = query.get('token');
  const navigate = useNavigate()


  

  useEffect(() => {
    validateToken(urlToken)
     .then((response) => {
        if (response.data.valid) {
          setIsValid(true);
        } else {
          setErrorMessage(response.data.error);
          setIsValid(false);
        }
      })
     .catch((error) => {
        console.log("Error validating token:", error);
        setIsValid(false);
      });
  }, []);

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
  
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setSubmitting(false);
      return;
    }

  
  
    try {

      const response = await setPass(urlToken, password);
      if (response && response.data) {
        toast.success(response.data.message);
        console.log("Password set successfully, redirecting to login...");
        setTimeout(() => {
          navigate('/');
        }, 3000); // Redirect after 3 seconds
      } else {
        setErrorMessage("An error occurred while setting password");
      }
  
      setSubmitting(false);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 401) {
          setErrorMessage("Invalid token");
        } else {
          setErrorMessage("An error occurred while setting password");
        }
      } else {
        setErrorMessage("An error occurred while setting password");
      }
    
      setSubmitting(false);
    }
  };

  if(!isValid){
    return (
      <div>
        <h1>Link is no longer available</h1>
      </div>
    );
  
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 ">

      <div className="fixed top-20 right-1/2 transform translate-x-1/2">
        <img src={moriLogo} alt="mori logo" className="text-6xl font-bold text-gray-700 w-40" />
      </div>
      <div className="w-96">
        <div className="bg-white w-80 sm:w-80 md:w-80 lg:w-90 xl:w-90 p-10 rounded-3xl sh gap-40 mx-auto">
            <h1 className="text-3xl pb-2.5 font-bold font-vietnam">Set Password</h1>

            <form onSubmit={handleSubmit} className="mt-0.1">

              {/* New Password Field */}
              <div className="flex flex-col items-start relative w-full">
                <label htmlFor="password" className="text-black pt-3 text-base font-medium font-vietnam">Password</label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="w-full py-px pt-1 pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-gray placeholder:text-gray focus:outline-none text-gray placeholder:text-xs"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  
                  {/* Eye icon to toggle password visibility */}
                  <div className="absolute pt-10 right-0 pr-3 flex items-center text-sm leading-5 top-1">

                    {/* Visible state icon */}
                    <svg
                      className="h-4 text-gray-400 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                      ></path>
                    </svg>

                    {/* Hidden state icon */}
                    <svg
                      className="h-4 text-gray-400 cursor-pointer hidden"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="currentColor"
                        d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07a32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                      ></path>
                    </svg>

                  </div>
                </div>
                
                
                {/* Confirm Password Field */}
                <div className="flex flex-col items-start relative w-full">
                <label htmlFor="password" className="text-black pt-3 text-base font-medium font-vietnam">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full py-px pt-1 pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-gray placeholder:text-gray focus:outline-none text-gray placeholder:text-xs"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  
                  {/* Eye icon to toggle password visibility */}
                  <div className="absolute pt-10 right-0 pr-3 flex items-center text-sm leading-5 top-1">

                    {/* Visible state icon */}
                    <svg
                      className="h-4 text-gray-400 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                      ></path>
                    </svg>

                    {/* Hidden state icon */}
                    <svg
                      className="h-4 text-gray-400 cursor-pointer hidden"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="currentColor"
                        d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07a32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                      ></path>
                    </svg>

                  </div>
                </div>
                                
                {/* Login button */}
                <button 
                  type="submit"
                  className="bg-zinc-500 hover:bg-zinc-700  text-white text-sm font-light font-vietnam py-2.5 px-7 rounded-xl mt-4 w-full"
                >
                  CONFIRM
                </button>
            </form>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

          </div>
        </div>
        
          {/* Footer */}
          <div className="absolute bottom-10 w-full text-center text-xs text-gray-600">
          © 2011-2024, XYZ | <Link to="/help" className="hover:underline">Help</Link>
        </div>
        
      </div>
  );
}