import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input } from "./index";
import { useForm } from "react-hook-form";
import { UserDataContext } from "./Context/UserContext.jsx"; // Adjust the import path as needed
import { useDispatch } from "react-redux";
import { login as reduxLogin } from "../store/authSlice"; // adjust path if needed

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({
    company: "",
    work: "",
    role: "",
  });
  const { user, setUser } = useContext(UserDataContext);

  const handleSelection = (key, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value, // Toggle selection
    }));
    setValue(key, value);
  };

  const createAccount = async (data) => {
    setError("");

    if (
      !selectedOptions.company ||
      !selectedOptions.work ||
      !selectedOptions.role
    ) {
      setError("Please select Company Type, Work Field, and Role.");
      return;
    }

    const formData = {
      fullName: data.fullName.trim(), // ✅ Use 'fullName'
      email: data.email.trim(),
      password: data.password,
      phone: data.phone.trim(),
      city: data.city,
      companyType: selectedOptions.company,
      workField: selectedOptions.work,
      role: selectedOptions.role,
      address: data.address.trim(),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // Include cookies for session management
      });

      const result = await response.json();
      setUser(result.user); // Save user data in context

      if (!response.ok) {
        setError(
          result.message || "This email is already registered. Try another one."
        );
        return;
      }

      // ✅ Immediately update Redux state so header/profile updates
      dispatch(reduxLogin({ userData: { ...result.user, userType: "employer" } }));

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Error saving data. Please try again.");
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#0a66c2] px-4 py-8 sm:px-6 lg:px-8">
      {/* Main Container */}
      <div className="w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#0a66c2] to-[#084a94] px-6 py-8 sm:px-8 lg:px-12">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                Sign up as an Employer
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-blue-100 mb-4">
                Join our platform and find the best talent
              </p>
              <p className="text-sm sm:text-base text-blue-100">
                Already have an account?{" "}
                <Link 
                  className="text-white font-semibold hover:text-blue-200 hover:underline transition-colors duration-200" 
                  to="/login"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="px-6 py-4 sm:px-8 lg:px-12 bg-gray-50 border-b">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold ${
                  step >= 1 ? 'bg-[#0a66c2] text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  1
                </div>
                <span className="ml-2 text-xs sm:text-sm font-medium text-gray-700">Personal Info</span>
              </div>
              <div className={`w-8 sm:w-12 h-0.5 ${step >= 2 ? 'bg-[#0a66c2]' : 'bg-gray-300'}`}></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold ${
                  step >= 2 ? 'bg-[#0a66c2] text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  2
                </div>
                <span className="ml-2 text-xs sm:text-sm font-medium text-gray-700">Company Details</span>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-6 py-8 sm:px-8 lg:px-12">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm sm:text-base text-center">{error}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit(createAccount)}>
              {step === 1 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <Input
                        label="Full Name"
                        placeholder="Enter Your Full Name"
                        type="text"
                        className="w-full"
                        {...register("fullName", {
                          required: "Full name is required",
                        })}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <Input
                        label="Email"
                        placeholder="Enter Your Email"
                        type="email"
                        className="w-full"
                        {...register("email", { required: "Email is required" })}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Password */}
                    <div>
                      <Input
                        label="Password"
                        type="password"
                        placeholder="Create Your Password"
                        className="w-full"
                        {...register("password", {
                          required: "Password is required",
                          minLength: 6,
                        })}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          Password must be at least 6 characters
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="Enter Your Phone Number"
                        className="w-full"
                        {...register("phone", {
                          required: "Phone number is required",
                        })}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  {/* City and Address */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* City */}
                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <select
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent text-sm sm:text-base"
                        {...register("city", { required: "City is required" })}
                      >
                        <option value="">Select City</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Bangalore">Bangalore</option>
                      </select>
                      {errors.city && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <Input
                        label="Address"
                        placeholder="Company Address"
                        type="text"
                        className="w-full"
                        {...register("address", { required: "Address is required" })}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company Type */}
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                      Type of Company
                    </label>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {["Product Based", "Service Based"].map((company) => (
                        <button
                          key={company}
                          type="button"
                          className={`px-4 py-2 sm:px-6 sm:py-3 border rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                            selectedOptions.company === company
                              ? "bg-[#0a66c2] text-white border-[#0a66c2] shadow-md transform scale-105"
                              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                          }`}
                          onClick={() => handleSelection("company", company)}
                        >
                          {company}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Work Field */}
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                      Field of Work
                    </label>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {["Technical", "Designing", "Research", "Marketing"].map(
                        (field) => (
                          <button
                            key={field}
                            type="button"
                            className={`px-4 py-2 sm:px-6 sm:py-3 border rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                              selectedOptions.work === field
                                ? "bg-[#0a66c2] text-white border-[#0a66c2] shadow-md transform scale-105"
                                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                            }`}
                            onClick={() => handleSelection("work", field)}
                          >
                            {field}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Role Types */}
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                      Kind of Roles
                    </label>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {[
                        "Intern",
                        "Full Time",
                        "Work from Home",
                        "Work from Office",
                        "Hybrid",
                      ].map((role) => (
                        <button
                          key={role}
                          type="button"
                          className={`px-4 py-2 sm:px-6 sm:py-3 border rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                            selectedOptions.role === role
                              ? "bg-[#0a66c2] text-white border-[#0a66c2] shadow-md transform scale-105"
                              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                          }`}
                          onClick={() => handleSelection("role", role)}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t">
                <div className="flex gap-3 w-full sm:w-auto">
                  {step > 1 && (
                    <Button
                      type="button"
                      className="flex-1 sm:flex-none bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-6 rounded-md font-medium transition-colors duration-200"
                      onClick={prevStep}
                    >
                      Previous
                    </Button>
                  )}
                </div>
                
                <div className="flex gap-3 w-full sm:w-auto">
                  {step < 2 ? (
                    <Button
                      type="button"
                      className="flex-1 sm:flex-none bg-[#0a66c2] hover:bg-[#084a94] text-white py-3 px-6 rounded-md font-medium transition-all duration-200 transform hover:scale-105"
                      onClick={nextStep}
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating Account...
                        </span>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;