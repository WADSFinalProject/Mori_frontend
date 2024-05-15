import React, { useState, useRef, useEffect } from 'react';
import { useWindowSize } from 'react-use';
import LaptopBG from '../../assets/LOGIN/LaptopBG.png';
import mori from '../../assets/LOGIN/mori.png';
import ArrowRight from '../../assets/LOGIN/ArrowRight.png';
import showpass from '../../assets/LOGIN/showpass.png';
import hidepass from '../../assets/LOGIN/hidepass.png';

const Login = () => {
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const inputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  const { width } = useWindowSize(); // Get the window width
  const [isClicked, setIsClicked] = useState(false);
    const [showVerificationForm, setShowVerificationForm] = useState(false);
    const [showCodeEntry, setShowCodeEntry] = useState(false);
    const [verificationCode, setVerificationCode] = useState(Array(4).fill("")); // Array to hold each digit of the code
    const [timer, setTimer] = useState(59); // Start timer at 59 seconds
    const [invalidCode, setInvalidCode] = useState(false); // State to control the visibility of invalid code message
    const timerInterval = useRef(null);
    const [success, setSuccess] = useState(false); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword); 
    };
  
    const passwordInputType = showPassword ? 'text' : 'password';
    const confirmPasswordInputType = showConfirmPassword ? 'text' : 'password'; // Use this for the confirm password input


    const handlePasswordReset = (event) => {
      event.preventDefault();
      let valid = true;
      let errorMsg = '';
    
      // Password validation rules
      if (password.length < 8) {
        valid = false;
        errorMsg = 'Password must be at least 8 characters long.';
      } else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
        valid = false;
        errorMsg = 'Password must contain letters and numbers.';
      } else if (password !== confirmPassword) {
        valid = false;
        errorMsg = 'Passwords do not match.';
      }
    
      if (!valid) {
        setPasswordError(errorMsg);
      } else {
        // Reset all relevant states to return to the login view
        setPasswordError('');
        setPassword('');  // Reset the password
        setConfirmPassword('');  // Reset the confirm password
        setSuccess(false);  // Reset success to hide the reset password form
        setShowVerificationForm(false);  // Ensure no forms are shown
        setShowCodeEntry(false);  // Ensure the verification code entry is not shown
        setIsClicked(false);  // Reset to initial state to show the login button again
      }
    };
    
    
  
    useEffect(() => {
      if (showCodeEntry && timer > 0) {
        const interval = setInterval(() => {
          setTimer(prevTime => prevTime - 1);
        }, 1000);
        return () => clearInterval(interval);
      }
    }, [showCodeEntry, timer]);
  
    const handleLoginClick = () => {
      setIsClicked(true);
    };
  
    const handleForgotPassword = () => {
      setShowVerificationForm(true);
    };
  
    const handleSendVerification = (event) => {
      event.preventDefault();
      setShowVerificationForm(false);
      setShowCodeEntry(true);
    };
  
    const handleCodeInputChange = (index, event) => {
      const newCode = [...verificationCode];
      newCode[index] = event.target.value.toUpperCase();
      setVerificationCode(newCode);
      if (event.target.value && index < 3) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    };
  const handleResendCode = () => {
    console.log("Resending code...");
    setTimer(60); // Restart the timer without changing the form state
};
    const handleSubmit = () => {
      // Dummy verification code for testing
      const dummyCode = "1234";
  
      // Check if the entered code matches the dummy code
      if (verificationCode.join("") === dummyCode) {
        console.log("Verification Code Submitted:", verificationCode.join(""));
        setSuccess(true); // Set success state to true
        setShowCodeEntry(false);
      } else {
        console.log("Incorrect Verification Code");
        setInvalidCode(true); // Set invalid code message to be visible
        // Apply red border color to input boxes
        for (let i = 0; i < verificationCode.length; i++) {
          const inputBox = document.getElementById(`code-${i}`);
          if (inputBox) {
            inputBox.style.borderColor = '#902E2E';
            inputBox.style.color = '#902E2E';
          }
        }
      }
    };
  
    const formatTime = () => {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };
  
    const handleKeyDown = (e, index) => {
      // Reset the border color when a key is pressed
      const inputBox = document.getElementById(`code-${index}`);
      if (inputBox) {
        inputBox.style.borderColor = '';
        inputBox.style.color = '';
      }
    
      if (!/^[0-9]{1}$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab" && !e.metaKey) {
        e.preventDefault();
      }
    
      // Manage backspace or delete key operations
      if (e.key === "Backspace") {
        // Check if current box is empty or backspace was pressed
        if (!verificationCode[index] || index > 0) {
          e.preventDefault(); // Prevent default to avoid deleting twice
          const newCode = [...verificationCode];
          newCode[index] = ""; // Clear current box
    
          // Move focus to previous box and clear its content if current was already empty
          if (index > 0 && !verificationCode[index]) {
            newCode[index - 1] = "";
            document.getElementById(`code-${index - 1}`).focus();
          } else {
            document.getElementById(`code-${index}`).focus();
          }
    
          setVerificationCode(newCode);
        }
      }
    };
    

  // const handleKeyDown = (e, index) => {
  //   if (
  //     !/^[0-9]{1}$/.test(e.key) &&
  //     e.key !== "Backspace" &&
  //     e.key !== "Delete" &&
  //     e.key !== "Tab" &&
  //     !e.metaKey
  //   ) {
  //     e.preventDefault();
  //   }
    

  //   if (e.key === "Delete" || e.key === "Backspace") {
  //     const nextIndex = index > 0 ? index - 1 : 0;
  //     const newInputs = [...inputs];
  //     newInputs[nextIndex] = "";
  //     setInputs(newInputs);
  //     inputRefs.current[nextIndex].current.focus();
  //   }
  // };

  const handleInput = (e, index) => {
    const newInputs = [...inputs];
    newInputs[index] = e.target.value;
    setInputs(newInputs);

    if (index < 3 && e.target.value) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").split("");
    if (text.length === 4 && text.every((ch) => /^[0-9]$/.test(ch))) {
      setInputs(text);
      inputRefs.current[3].current.focus();
    }
  };

  const [showForm, setShowForm] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = () => {
    setShowForm(!showForm); // Toggle the form's visibility and animation state
  };

  const switchToVerification = () => {
    setCurrentForm("verification");
  };

  return (
    <>
      {width < 768 ? (
        <div className="max-w-[390px] h-screen bg-slate-50 overflow-hidden leading-normal tracking-normal ml-auto mr-auto">
          <main>
            <div className="w-full h-screen relative bg-login bg-no-repeat bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:block before:bg-gradient-to-t before:from-[#10382D] before:from-35%">
              {/* MAIN */}
              <div className="w-full h-screen flex flex-col items-center relative top-[58%]">
                <img
                  className={`select-none transition-transform duration-500 ${
                    showForm ? "scale-50 -translate-y-[22rem]" : ""
                  }`}
                  src="src\assets\login2\logo.svg"
                ></img>
                <button
                  onClick={toggleForm}
                  className="mt-5 rounded-full w-12 h-12 bg-white flex items-center justify-center hover:bg-gray-100"
                >
                  <img
                    className="select-none"
                    src="src\assets\login2\arrow.svg"
                  ></img>
                </button>
              </div>
  
              {/* FORM CONTAINER */}
              <div
                className={`absolute h-[70%] w-full bg-white bottom-0 rounded-t-[20px] pt-11 px-6 transition-transform duration-500 ${
                  showForm ? "translate-y-0" : "translate-y-full"
                }`}
              >
                <div className="flex w-[200%] overflow-hidden">
                  {/* LOGIN FORM */}
                  <div
                    className={`w-full transition-transform duration-500 ease-in-out ${
                      currentForm === "login"
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }`}
                  >
                    <h1 className="font-vietnam font-bold text-4xl">Login</h1>
                    <h3 className="font-vietnam font-semibold text-xl mt-8 pb-1">
                      Email
                    </h3>
                    <form id="login-form">
                      <input
                        placeholder="Enter Email"
                        type="email"
                        className="bg-transparent border-0 border-b-[2px] border-zinc-300 outline-none w-full font-vietnam font-medium text-lg py-2 pl-0 text-gray-800 placeholder-zinc-300 focus:ring-transparent focus:border-zinc-500"
                      />
                      <h3 className="font-vietnam font-semibold text-xl mt-8 pb-1">
                        Password
                      </h3>
                      <input
                        placeholder="Enter Password"
                        type="password"
                        className="bg-transparent border-0 border-b-[2px] border-zinc-300 outline-none w-full font-vietnam font-medium text-lg py-2 pl-0 text-gray-800 placeholder-zinc-300 focus:ring-transparent focus:border-zinc-500"
                      />
  
                      <button
                        type="submit"
                        className="mt-8 w-full h-9 bg-black rounded-xl text-white font-vietnam text-sm font-medium justify-center items-center hover:bg-black/85"
                      >
                        LOGIN
                      </button>
                    </form>
  
                    <div className="mt-5 text-center">
                      <a
                        onClick={switchToVerification}
                        className="underline font-vietnam text-sm text-black hover:text-black/60 cursor-pointer"
                      >
                        FORGOT PASSWORD
                      </a>
                    </div>
                  </div>
  
                  {/* VERIFICATION FORM */}
                  <div
                    className={`w-full transition-transform duration-500 ease-in-out ${
                      currentForm === "verification"
                        ? "translate-x-0"
                        : "translate-x-full"
                    }`}
                  >
                    <h1 className="font-vietnam font-bold text-3xl">
                      Verification Code
                    </h1>
                    <p className="font-vietnam font-medium text-xs mt-1">
                      Enter your verification code that we sent through your email
                      or phone number
                    </p>
  
                    <form id="otp-form">
                      <div className="flex items-center justify-center gap-x-10 mt-5">
                        {inputs.map((value, index) => (
                          <input
                            key={index}
                            ref={inputRefs.current[index]}
                            type="text"
                            className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-transparent border-[2.5px] border-zinc-300 rounded hover:border-slate-200 appearance-none p-2.5 outline-none focus:bg-white focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
                            pattern="\d*"
                            maxLength="1"
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onInput={(e) => handleInput(e, index)}
                            onPaste={handlePaste}
                            value={value}
                          />
                        ))}
                      </div>
  
                      <button
                        type="submit"
                        className="mt-8 w-full h-9 bg-black rounded-xl text-white font-vietnam text-sm font-medium justify-center items-center hover:bg-black/85"
                      >
                        VERIFY
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      ) : (
        // Render desktop version for screen widths equal to or greater than 768px
        <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute w-full h-full bg-cover" style={{ backgroundImage: `url(${LaptopBG})` }}>
          <div className="flex flex-col items-center justify-center h-full">
            {/* Conditional rendering for logos based on isClicked */}
            <div className={`flex mb-4 transition-transform duration-500 ease-out ${isClicked ? 'transform translate-x-[calc(30vw-4rem)]' : ''}`}>
              {!isClicked ? (
                <>
                  <img src={mori} alt="morimori logo" className="mr-2" />
                  <img src={mori} alt="morimori logo" className="ml-2" />
                </>
              ) : (
                <img src={mori} alt="morimori logo" className="mr-2" />
              )}
            </div>
            {!showVerificationForm && !showCodeEntry && !success && (
              <button onClick={handleLoginClick} className={`focus:outline-none ${isClicked ? 'hidden' : ''}`}>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mt-2">
                  <img src={ArrowRight} alt="arrow right" className="w-6 h-6" />
                </div>
              </button>
            )}
          </div>
        </div>
        
        {showVerificationForm ? (
          <div className="absolute top-0 left-0 h-full w-1/2 bg-white transform translate-x-0 transition-transform duration-500 ease-in-out">
            <div className="flex items-center justify-center h-full">
              <div className="w-full max-w-md p-8">
                <h1 className="font-vietnam font-bold text-center text-4xl">Forgot Password</h1>
                <form id="verification-form" className="space-y-8 mt-8" onSubmit={handleSendVerification}>
                  <div>
                    <label htmlFor="email" className="font-vietnam font-semibold text-xl block mb-2">Email</label>
                    <input
                      id="email"
                      placeholder="Enter Email"
                      type="email"
                      className="bg-transparent border-0 border-b-2 border-zinc-300 outline-none w-full lg:w-96 font-vietnam font-medium text-lg py-2 pl-0 text-gray-800 placeholder-zinc-300 focus:ring-transparent focus:border-zinc-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-8 w-full h-9 bg-black rounded-xl text-white font-vietnam text-sm font-medium justify-center items-center hover:bg-black/85"
                  >
                    Send Verification
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : showCodeEntry ? (
          <div className="absolute top-0 left-0 h-full w-1/2 bg-white transform translate-x-0 transition-transform duration-500 ease-in-out">
            <div className="flex items-center justify-center h-full">
              <div className="w-full max-w-md p-8">
                <h1 className="font-vietnam font-bold text-center text-4xl">Verification Code</h1>
                <p className="text-center mb-4">Enter your verification code that we sent through your email or phone number</p>
                <div className="flex justify-center space-x-2 gap-4">
                  {verificationCode.map((code, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength="1"
                      value={code}
                      onChange={(e) => handleCodeInputChange(index, e)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-12 text-xl text-center border-2 border-gray-300"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
                {invalidCode && (
                  <div className="text-xs font-vietnam font-medium mt-4 w-full text-center" style={{ color: '#902E2E' }}>
                    Verification code invalid!
                  </div>
                )}
    
                <div className="flex flex-col items-center mt-4">
                  {timer > 0 ? (
                    <div className="text-lg font-medium">{formatTime()}</div>
                  ) : (
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="text-lg text-gray-500">Didn’t receive any code?</span>
                      <button onClick={handleResendCode} className="ml-2 text-lg font-bold text-black underline hover:text-gray-900 cursor-pointer">
                        Resend Code
                      </button>
                    </div>
                  )}
                  <button
                    onClick={handleSubmit}
                    className="mt-4 px-20 py-2 bg-black text-white rounded hover:bg-gray-900"
                    style={{ width: "calc(100% - 2rem)" }}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : success ? (
        <div className="absolute top-0 left-0 h-full w-1/2 bg-white transform translate-x-0 transition-transform duration-500 ease-in-out">
        <div className="flex items-center justify-center h-full">
          <div className="w-full max-w-md p-8">
            <h1 className="font-vietnam font-bold text-4xl text-center">Reset Password</h1>
            <form id="reset-password-form" className="space-y-8 mt-8" onSubmit={handlePasswordReset}>
            <div>
    <label htmlFor="reset-password" className="font-vietnam font-semibold text-xl block mb-2">Enter New Password</label>
    <div className="relative">
      <input
        id="reset-password"
        placeholder="Enter Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-transparent border-0 border-b-2 border-zinc-300 outline-none w-full font-vietnam font-medium text-lg py-2 pl-0 text-gray-800 placeholder-zinc-300 focus:ring-transparent focus:border-zinc-500"
      />
      <button
        onClick={() => setShowPassword(!showPassword)} 
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <img 
          src={showPassword ? hidepass : showpass}
          alt={showPassword ? "Hide Password" : "Show Password"}
          style={{ width: '20px', height: '20px' }}
        />
      </button>
      {passwordError && (
        <div className="text-red-500 text-sm">{passwordError}</div>
      )}
    </div>
</div>
<div>
    <label htmlFor="reset-confirm-password" className="font-vietnam font-semibold text-xl block mb-2">Confirm New Password</label>
    <div className="relative">
  <input
    id="reset-confirm-password"
    placeholder="Confirm Password"
    type={confirmPasswordInputType} // Use the state controlled input type
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="bg-transparent border-0 border-b-2 border-zinc-300 outline-none w-full font-vietnam font-medium text-lg py-2 pl-0 text-gray-800 placeholder-zinc-300 focus:ring-transparent focus:border-zinc-500"
  />
  <button
    onClick={toggleConfirmPasswordVisibility} // Use the toggle function
    className="absolute inset-y-0 right-0 pr-3 flex items-center"
  >
    <img 
      src={showConfirmPassword ? hidepass : showpass}
      alt={showConfirmPassword ? "Hide Password" : "Show Password"}
      style={{ width: '20px', height: '20px' }}
    />
  </button>
  {passwordError && (
    <div className="text-red-500 text-sm">{passwordError}</div>
  )}
</div>
</div>
  <button
    type="submit"
    className="mt-8 w-full h-9 bg-black rounded-xxl text-white font-vietnam text-sm font-medium justify-center items-center hover:bg-black/85"
  >
    Confirm
  </button>
</form>
          </div>
        </div>
      </div>
    ) : (
      <div className={`absolute top-0 left-0 h-full w-1/2 bg-white transform transition-transform duration-500 ease-in-out ${isClicked ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-center h-full">
        <div className="w-full max-w-md p-8">
          <h1 className="font-vietnam font-bold text-6xl text-center">Login</h1>
          <form id="login-form" className="space-y-8 mt-8">
  <div>
    <label htmlFor="login-email" className="font-vietnam font-semibold text-xl block mb-2">Email</label>
    <input
      id="login-email"
      placeholder="Enter Email"
      type="email"
      className="bg-transparent border-0 border-b-2 border-zinc-300 outline-none w-full lg:w-96 font-vietnam font-medium text-lg py-2 pl-0 text-gray-800 placeholder-zinc-300 focus:ring-transparent focus:border-zinc-500"
    />
  </div>
  <div>
        <label htmlFor="login-password" className="font-vietnam font-semibold text-xl block mb-2">Password</label>
        <div className="relative">
          <input
            id="login-password"
            placeholder="Enter Password"
            type={passwordInputType}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border-0 border-b-2 border-zinc-300 outline-none w-full font-vietnam font-medium text-lg py-2 pl-0 text-gray-800 placeholder-zinc-300 focus:ring-transparent focus:border-zinc-500"
          />
          <button 
    onClick={togglePasswordVisibility} 
    className="absolute right-5 top-1/2 transform -translate-y-1/2"  // Adjust 'right-10' as needed
    style={{ width: '20px', height: '20px' }}
>
    <img 
        src={showPassword ? hidepass : showpass} 
        alt={showPassword ? "Hide Password" : "Show Password"}
    />
</button>

        </div>
      </div>
  <div className="flex flex-col items-center">
    <button
      type="submit"
      className="w-full h-9 bg-black rounded-xl text-white font-vietnam text-sm font-medium justify-center items-center hover:bg-black/85"
    >
      LOGIN
    </button>
    <a href="#" onClick={handleForgotPassword} className="text-sm font-medium text-center block mt-2 hover:underline hover:text-black">
      Forgot Password?
    </a>
  </div>
</form>
        </div>
      </div>
    </div>
  )}
        
        <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-transform duration-500 ease-out ${isClicked ? 'translate-x-[calc(26vw-4rem)]' : ''} text-white text-xs`}>
          © 2001-2024, XYZ | Help
        </div>
      </div>
    )}
  </>

  );
}

export default Login;
