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
    <div className="relative flex items-center justify-center min-h-screen bg-[#0a66c2]">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-4">
            Sign up as an Employer
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Already have an account?{" "}
            <Link className="text-blue-600 hover:underline" to="/login">
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <form
            className="flex flex-col"
            onSubmit={handleSubmit(createAccount)}
          >
            {step === 1 && (
              <>
                <Input
                  label="Full Name"
                  placeholder="Enter Your Full Name"
                  type="text"
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                />
                {errors.fullName && (
                  <p className="text-red-500">{errors.fullName.message}</p>
                )}

                <Input
                  label="Email"
                  placeholder="Enter Your Email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}

                <Input
                  label="Password"
                  type="password"
                  placeholder="Create Your Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: 6,
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">
                    Password must be at least 6 characters
                  </p>
                )}

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter Your Phone Number"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}
              </>
            )}

            {step === 2 && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700">City</label>
                  <select
                    className="w-full p-2 border rounded"
                    {...register("city", { required: "City is required" })}
                  >
                    <option value="">Select City</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                  </select>
                  {errors.city && (
                    <p className="text-red-500">{errors.city.message}</p>
                  )}
                </div>

                <div className="mb-4 w-[80%]">
                  <label className="block text-gray-700 mb-2">
                    Type of Company
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Product Based", "Service Based"].map((company) => (
                      <button
                        key={company}
                        type="button"
                        className={`px-4 py-2 border rounded-full ${
                          selectedOptions.company === company
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => handleSelection("company", company)}
                      >
                        {company}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4 w-[80%]">
                  <label className="block text-gray-700 mb-2">
                    Field of Work
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Technical", "Designing", "Research", "Marketing"].map(
                      (field) => (
                        <button
                          key={field}
                          type="button"
                          className={`px-4 py-2 border rounded-full ${
                            selectedOptions.work === field
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                          onClick={() => handleSelection("work", field)}
                        >
                          {field}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="mb-4 w-[80%]">
                  <label className="block text-gray-700 mb-2">
                    Kind of Roles
                  </label>
                  <div className="flex flex-wrap gap-2">
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
                        className={`px-4 py-2 border rounded-full ${
                          selectedOptions.role === role
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => handleSelection("role", role)}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <Input
                  label="Address"
                  placeholder="Company Address"
                  type="text"
                  {...register("address", { required: "Address is required" })}
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address.message}</p>
                )}
              </>
            )}

            <div className="flex justify-between">
              {step > 1 && (
                <Button
                  type="button"
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded"
                  onClick={prevStep}
                >
                  Previous
                </Button>
              )}
              {step < 2 ? (
                <Button
                  type="button"
                  className="bg-blue-600 text-white py-2 px-4 rounded"
                  onClick={nextStep}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Save Data"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
