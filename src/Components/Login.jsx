import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { Button, Input, PassInput } from "./index";
import Image from "./Home/images/InternLogo.png";
import "./Header/styles.css";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const login = async (data) => {
        setError("");

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // for setting cookies
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Login failed");
            }

            // Dispatch Redux action to update user state
            dispatch(authLogin({ userData: { ...result.user, userType: "employer" } }));

            // Navigate to homepage
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-[#eff7fc] px-4 py-8 sm:px-6 lg:px-8">
            {/* Logo - Responsive positioning */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 sm:top-6 md:top-8">
                <img
                    src={Image}
                    alt="Logo"
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain hover-rotate"
                />
            </div>

            {/* Main Container */}
            <div className="w-full max-w-7xl mx-auto mt-20 sm:mt-24 md:mt-32">
                <div className="overflow-hidden shadow-2xl rounded-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                        {/* Left Section - Contact Info */}
                        <div className="p-6 sm:p-8 lg:p-12 bg-[#0a66c2] flex flex-col justify-center order-2 lg:order-1">
                            <div className="max-w-md mx-auto w-full">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white font-extrabold tracking-tight mb-4">
                                    Get In Touch:
                                </h1>
                                <p className="text-base sm:text-lg lg:text-xl font-medium text-white mb-8">
                                    Fill In The Form To Start A Conversation
                                </p>
                                
                                {/* Contact Details */}
                                <div className="space-y-6">
                                    {/* Location */}
                                    <div className="flex items-center text-white">
                                        <div className="flex-shrink-0">
                                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4 text-sm sm:text-base lg:text-lg tracking-wide font-semibold">
                                            New Delhi
                                        </div>
                                    </div>
                                    
                                    {/* Phone */}
                                    <div className="flex items-center text-white">
                                        <div className="flex-shrink-0">
                                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4 text-sm sm:text-base lg:text-lg tracking-wide font-semibold">
                                            +91 70119 89792
                                        </div>
                                    </div>
                                    
                                    {/* Email */}
                                    <div className="flex items-center text-white">
                                        <div className="flex-shrink-0">
                                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4 text-sm sm:text-base lg:text-lg tracking-wide font-semibold break-all">
                                            internswallah@gmail.com
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Login Form */}
                        <div className="p-6 sm:p-8 lg:p-12 bg-white flex flex-col justify-center order-1 lg:order-2">
                            <div className="max-w-md mx-auto w-full">
                                <form onSubmit={handleSubmit(login)} className="space-y-6">
                                    {/* Header */}
                                    <div className="text-center">
                                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-gray-900">
                                            Sign In To Your Applicant Account
                                        </h2>
                                        <p className="mt-3 text-sm sm:text-base text-gray-600">
                                            Don't have an account?{" "}
                                            <Link 
                                                to="/signup" 
                                                className="font-medium text-[#0a66c2] hover:text-[#084a94] hover:underline transition-colors duration-200"
                                            >
                                                Sign Up
                                            </Link>
                                        </p>
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                            <p className="text-red-600 text-sm text-center">{error}</p>
                                        </div>
                                    )}

                                    {/* Form Fields */}
                                    <div className="space-y-5">
                                        {/* Email */}
                                        <div>
                                            <Input
                                                label="Email"
                                                placeholder="Enter Your Email"
                                                className="w-full"
                                                type="email"
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                                        message: "Invalid email format",
                                                    },
                                                })}
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-xs sm:text-sm mt-1">
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <PassInput
                                                label="Password"
                                                placeholder="Enter Your Password"
                                                className="w-full"
                                                {...register("password", {
                                                    required: "Password is required",
                                                    minLength: {
                                                        value: 6,
                                                        message: "Password must be at least 6 characters",
                                                    },
                                                })}
                                            />
                                            {errors.password && (
                                                <p className="text-red-500 text-xs sm:text-sm mt-1">
                                                    {errors.password.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <Button 
                                        type="submit" 
                                        className="w-full py-3 px-4 text-sm sm:text-base font-medium rounded-md transition-all duration-200 transform hover:scale-[1.02] focus:scale-[1.02]" 
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Signing in..." : "Sign In"}
                                    </Button>

                                    {/* Forgot Password */}
                                    <div className="text-center">
                                        <Link 
                                            to="/forgot-password" 
                                            className="text-[#0a66c2] text-xs sm:text-sm hover:text-[#084a94] hover:underline transition-colors duration-200"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;