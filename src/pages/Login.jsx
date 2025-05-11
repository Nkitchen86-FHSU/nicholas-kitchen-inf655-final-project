import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { user, signIn } = UserAuth();

    // Attempt to login with the set username and password
    const handleSubmit = async(e) => {
        e.preventDefault();
        setError(null);
        try{
            const userCredential = await signIn(email, password);
            const user = userCredential.user;
            localStorage.setItem("authToken", await user.getIdToken());
            navigate("/");
        } catch(error) {
            setError(error.message);
        }
    }

    // If user is already authenticated, then go to the profile page
    useEffect(() => {
        if (user) {
          navigate("/profile");
        }
    }, [user, navigate]);

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-custom-dark-navy-blue">
                {/* Login Form */}
                <form onSubmit={handleSubmit} className="login_Form bg-orange-100 px-1 lg:px-8 py-6 border border-gray-700 rounded-xl shadow-md">
                    {/* Top Heading */}
                    <div className="mb-5">
                        <h2 className="text-center text-2xl font-bold">
                            Login
                        </h2>
                    </div>
                    {/* Display Error Message */}
                    {error && <div className="mb-3 text-red-500">{error}</div>}
                    {/* Input Two */}
                    <div className="mb-3">
                        <input 
                            type="email" 
                            placeholder="Enter email" 
                            value={email} 
                            onChange={(e) => {setEmail(e.target.value)}}
                            className="bg-gray-50 border border-gray-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-400"
                        />
                    </div>
                    <div className="mb-5">
                        <input 
                            type="password" 
                            placeholder="Enter password" 
                            value={password} 
                            onChange={(e) => {setPassword(e.target.value)}}
                            className="bg-gray-50 border border-gray-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-400"
                        />
                    </div>
                    {/* SignUp Button */}
                    <div className="mb-5">
                        <button
                            type="submit"
                            className="bg-gray-500 hover:bg-gray-600 w-full text-white text-center py-2 font-bold rounded-md"
                        >
                            Login
                        </button>
                    </div>
                    {/* Give option to go to signup if user doesn't have an account */}
                    <div>
                        <h2 className="text-black">
                            Don't have an Account?
                            <Link className="text-blue-500 hover:text-blue-700 font-bold" to={"/signUp"}> SignUp</Link>
                        </h2>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;