import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';


function SignUp() {
  const navigate = useNavigate();
  const [userSignUp, setUserSignUp] = useState({
    username:"",
    email:"",
    password:""
  });
  const userSignUpFunction = async() => {
    // Validation
    if(userSignUp.username === "" || userSignUp.email === "" || userSignUp.password === "") {
      toast.error("All Fields are required");
      return;
    }

    try {
      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userSignUp.email,
        userSignUp.password
      );

      // Set display name in Firebase Auth profile
      await updateProfile(userCredential.user, {
        displayName: userSignUp.username
      });

      // On success
      toast.success("SignUp Successfully!");
      navigate("/login");
    } catch(error) {
      console.log(error);
    }
  };
  

  return (
    <>
     <div className="flex justify-center items-center h-screen bg-custom-dark-navy-blue">
        {/* Login Form */}
        <div className="login_Form bg-orange-100 px-1 lg:px-8 py-6 border border-gray-100 rounded-xl shadow-md">
          {/* Top Heading */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold">
              SignUp
            </h2>
          </div>
          <div className="mb-3">
            <input 
              type="text" 
              placeholder="Enter username" 
              value={userSignUp.username} 
              onChange={(e) => {
                setUserSignUp({ ...userSignUp, username: e.target.value })
              }}
              className="bg-gray-50 border border-gray-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-400"
            />
          </div>
          <div className="mb-3">
            <input 
              type="email" 
              placeholder="Enter email" 
              value={userSignUp.email} 
              onChange={(e) => {
                setUserSignUp({ ...userSignUp, email: e.target.value })
              }}
              className="bg-gray-50 border border-gray-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-400"
            />
          </div>
          <div className="mb-3">
            <input 
              type="password" 
              placeholder="Enter password" 
              value={userSignUp.password} 
              onChange={(e) => {
                setUserSignUp({ ...userSignUp, password: e.target.value })
              }}
              className="bg-gray-50 border border-gray-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-400"
            />
          </div>
          <div className="mb-5">
              <button
                type="button"
                onClick={userSignUpFunction}
                className="bg-gray-500 hover:bg-gray-600 w-full text-white text-center py-2 font-bold rounded-md"
              >
                SignUp
              </button>
          </div>
          <div>
            <h2 className="text-black">
              Have an Account?
              <Link className="text-blue-500 hover:text-blue-700 font-bold" to={"/login"}> Login</Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp;