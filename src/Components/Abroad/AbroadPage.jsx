import React, { useState } from "react";
import "./abroad.css";
import collegesData from "./collegesData";

const AbroadPage = () => {
  const [specialization, setSpecialization] = useState("");
  const [country, setCountry] = useState("");
  const [results, setResults] = useState([]);
  const [appliedSpecialization, setAppliedSpecialization] = useState("");
  const [appliedCountry, setAppliedCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!specialization || !country) {
      alert("Please select both specialization and country.");
      return;
    }

    const filteredResults = collegesData.filter(
      (college) =>
        college.specialization === specialization &&
        college.country === country,
    );

    setResults(filteredResults);

    //  Save the submitted values
    setAppliedSpecialization(specialization);
    setAppliedCountry(country);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat bg-fixed px-4 py-10 md:py-16 relative"
      style={{ backgroundImage: `url('/abroad-bg.jpg')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70 md:bg-white/60 backdrop-blur-sm z-0"></div>

      {/* Header */}
      <div className="text-center mb-8 z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Find Your <span className="text-[#0a66c2]"> Dream College </span>{" "}
          Abroad For MBA & MSc
        </h1>
        <p className="text-gray-600 text-base md:text-xl mt-4">
          Choose from over 4,000 colleges, get free personalized counseling,
        </p>
        <p className="text-gray-600 mt-2 text-base md:text-xl">
          and secure up to 100% scholarships!
        </p>
      </div>

      {/* Form */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg z-10">
        <p className="text-gray-700 font-medium mb-4">I'm looking for</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Specialization */}
          <div>
            <label
              htmlFor="specialization"
              className="block text-sm font-medium text-gray-700"
            >
              Select specialization
            </label>
            <select
              id="specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select specialization</option>
              <option>MBA</option>
              <option>MSc Computer Science</option>
              <option>Data Science</option>
              <option>Artificial Intelligence</option>
              <option>Finance</option>
              <option>Marketing</option>
            </select>
          </div>

          {/* Country */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Select country
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select country</option>
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
              <option>Germany</option>
              <option>Australia</option>
              <option>France</option>
              <option>Russia</option>
              <option>Japan</option>
              <option>Singapore</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0a66c2] hover:bg-blue-600 text-white font-medium py-2 rounded-md transition badge"
          >
            Find Colleges
          </button>
        </form>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-12 w-full max-w-4xl bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl z-10 border border-white/30">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Colleges for{" "}
            <span className="text-[#0a66c2]">{appliedSpecialization}</span> in{" "}
            <span className="text-[#0a66c2]">{appliedCountry}</span>
          </h2>

          <ul className="space-y-3">
            {results.map((college) => (
              <li
                key={college.id}
                className="group bg-white rounded-xl p-5 border border-gray-200 hover:border-[#0a66c2]/40 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-[#0a66c2] transition">
                  {college.name}
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-3 py-1 text-xs rounded-full bg-violet-50 text-violet-700 font-medium">
                    {college.specialization}
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">
                    {college.country}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No results */}
      {results.length === 0 && specialization && country && (
        <p className="mt-6 text-gray-700 z-10">
          No colleges found for the selected criteria.
        </p>
      )}
    </div>
  );
};

export default AbroadPage;
