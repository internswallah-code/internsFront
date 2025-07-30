import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as reduxLogin } from "../store/authSlice";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function SignUp2() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedType, setSelectedType] = useState([]);

  const toggleSelection = (value, selectedList, setSelectedList, fieldName) => {
    const updatedList = selectedList.includes(value)
      ? selectedList.filter((item) => item !== value)
      : [...selectedList, value];
    setSelectedList(updatedList);
    setValue(fieldName, updatedList.join(",")); // Update the form value
  };

  const createAccount = async (data) => {
    setError("");
    if (!data.gender || !data.languages || !data.type) {
      setError("Please fill all required fields.");
      return;
    }

    // Prepare form data for backend
    const formData = {
      fullName: data.name?.trim(),
      email: data.email?.trim(),
      password: data.password,
      phone: data.phone?.trim(),
      city: data.city,
      gender: data.gender,
      languages: data.languages, // comma-separated string
      type: data.type, // comma-separated string
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/employee-signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include", // Include cookies for session management
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(
          result.message || "This email is already registered. Try another one."
        );
        return;
      }

      // Immediately update Redux state so header/profile updates
      dispatch(
        reduxLogin({ userData: { ...result.user, userType: "employee" } })
      );

      navigate("/");
    } catch (error) {
      setError(error.message || "An error occurred during sign-up.");
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a66c2] to-[#084a94] px-4 py-8 sm:px-6 lg:px-8">
      {/* Main Container */}
      <div className="w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#0a66c2] to-[#084a94] px-6 py-8 sm:px-8 lg:px-12">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                Sign up as an Applicant
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-blue-100 mb-4">
                Join our platform and discover amazing opportunities
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
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold ${
                    step >= 1
                      ? "bg-[#0a66c2] text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  1
                </div>
                <span className="ml-2 text-xs sm:text-sm font-medium text-gray-700">
                  Personal Info
                </span>
              </div>
              <div
                className={`w-8 sm:w-12 h-0.5 ${
                  step >= 2 ? "bg-[#0a66c2]" : "bg-gray-300"
                }`}
              ></div>
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold ${
                    step >= 2
                      ? "bg-[#0a66c2] text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  2
                </div>
                <span className="ml-2 text-xs sm:text-sm font-medium text-gray-700">
                  Preferences
                </span>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-6 py-8 sm:px-8 lg:px-12">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm sm:text-base text-center">
                  {error}
                </p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit(createAccount)}>
              {step === 1 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <Input
                        label="Name"
                        placeholder="Enter Your Name"
                        type="text"
                        className="w-full"
                        {...register("name", { required: "Name is required." })}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          {errors.name.message}
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
                        {...register("email", {
                          required: "Email is required.",
                          pattern: {
                            value:
                              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            message: "Invalid email address.",
                          },
                        })}
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
                          required: "Password is required.",
                        })}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          {errors.password.message}
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
                          required: "Phone number is required.",
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
                  {/* City */}
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent text-sm sm:text-base"
                      {...register("city", { required: "City is required." })}
                    >
                      <option value="">Select City</option>
                      {[
                        "Agra",
                        "Ahmedabad",
                        "Ajmer",
                        "Aligarh",
                        "Allahabad",
                        "Amritsar",
                        "Aurangabad",
                        "Bangalore",
                        "Bareilly",
                        "Bhopal",
                        "Bhubaneswar",
                        "Chandigarh",
                        "Chennai",
                        "Coimbatore",
                        "Cuttack",
                        "Dehradun",
                        "Delhi",
                        "Dhanbad",
                        "Durgapur",
                        "Faridabad",
                        "Firozabad",
                        "Ghaziabad",
                        "Goa",
                        "Gorakhpur",
                        "Guntur",
                        "Gurgaon",
                        "Guwahati",
                        "Gwalior",
                        "Hyderabad",
                        "Indore",
                        "Jabalpur",
                        "Jaipur",
                        "Jalandhar",
                        "Jammu",
                        "Jamnagar",
                        "Jamshedpur",
                        "Jhansi",
                        "Jodhpur",
                        "Kanpur",
                        "Kochi",
                        "Kolhapur",
                        "Kolkata",
                        "Kota",
                        "Kozhikode",
                        "Lucknow",
                        "Ludhiana",
                        "Madurai",
                        "Mangalore",
                        "Meerut",
                        "Moradabad",
                        "Mumbai",
                        "Muzaffarpur",
                        "Mysore",
                        "Nagpur",
                        "Nashik",
                        "Navi Mumbai",
                        "Noida",
                        "Patna",
                        "Pimpri-Chinchwad",
                        "Pondicherry",
                        "Prayagraj",
                        "Pune",
                        "Raipur",
                        "Rajkot",
                        "Ranchi",
                        "Rohtak",
                        "Rourkela",
                        "Salem",
                        "Siliguri",
                        "Solapur",
                        "Srinagar",
                        "Surat",
                        "Thane",
                        "Thiruvananthapuram",
                        "Tiruchirappalli",
                        "Tirunelveli",
                        "Udaipur",
                        "Ujjain",
                        "Vadodara",
                        "Varanasi",
                        "Vasai-Virar",
                        "Vellore",
                        "Vijayawada",
                        "Visakhapatnam",
                        "Warangal",
                      ].map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    {errors.city && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                      Gender
                    </label>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {["Female", "Male", "Others"].map((gender) => (
                        <button
                          key={gender}
                          type="button"
                          className={`px-4 py-2 sm:px-6 sm:py-3 border rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                            watch("gender") === gender
                              ? "bg-[#0a66c2] text-white border-[#0a66c2] shadow-md transform scale-105"
                              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                          }`}
                          onClick={() => setValue("gender", gender)}
                        >
                          {gender}
                        </button>
                      ))}
                    </div>
                    <input
                      type="hidden"
                      {...register("gender", {
                        required: "Please select your gender.",
                      })}
                    />
                    {errors.gender && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>

                  {/* Languages */}
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                      Languages you know
                    </label>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {[
                        "English",
                        "Hindi",
                        "Telugu",
                        "Tamil",
                        "Marathi",
                        "French",
                        "Japanese",
                      ].map((language) => (
                        <button
                          key={language}
                          type="button"
                          className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                            selectedLanguages.includes(language)
                              ? "bg-[#0a66c2] text-white border-[#0a66c2] shadow-md transform scale-105"
                              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                          }`}
                          onClick={() =>
                            toggleSelection(
                              language,
                              selectedLanguages,
                              setSelectedLanguages,
                              "languages"
                            )
                          }
                        >
                          {language}
                        </button>
                      ))}
                    </div>
                    <input
                      type="hidden"
                      value={selectedLanguages.join(",")}
                      {...register("languages", {
                        required: "Please select at least one language.",
                      })}
                    />
                    {errors.languages && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">
                        {errors.languages.message}
                      </p>
                    )}
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                      Type
                    </label>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {[
                        "College Student",
                        "Fresher",
                        "Working Professional",
                        "School Student",
                        "Woman returning to work",
                      ].map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                            selectedType.includes(type)
                              ? "bg-[#0a66c2] text-white border-[#0a66c2] shadow-md transform scale-105"
                              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                          }`}
                          onClick={() =>
                            toggleSelection(
                              type,
                              selectedType,
                              setSelectedType,
                              "type"
                            )
                          }
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    <input
                      type="hidden"
                      value={selectedType.join(",")}
                      {...register("type", {
                        required: "Please select at least one type.",
                      })}
                    />
                    {errors.type && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">
                        {errors.type.message}
                      </p>
                    )}
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
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
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

export default SignUp2;
