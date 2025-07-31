import React, { useState, useEffect } from "react";
import "./abroad.css";

const AbroadPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);

    // Auto-close the popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  // Prevent background scroll when popup is open (bonus)
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showPopup]);

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
          Find Your <span className="text-[#0a66c2]"> Dream College </span> Abroad For MBA & MSc
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
          <div>
            <label
              htmlFor="specialization"
              className="block text-sm font-medium text-gray-700"
            >
              Select specialization
            </label>
            <select
              id="specialization"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Select specialization</option>
              <option>Business Administration</option>
              <option>Engineering</option>
              <option>Healthcare</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Select country
            </label>
            <select
              id="country"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Select country</option>
              <option>United States</option>
              <option>Canada</option>
              <option>Australia</option>
              <option>Germany</option>
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

      {/* Thank You Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl px-10 py-8 w-[90%] max-w-md shadow-xl transform transition-all duration-300 scale-100 opacity-100">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              🎓 Thank You!
            </h2>
            <p className="text-gray-600 text-lg text-center mb-6">
              We've received your request. You'll hear from us shortly!
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-[#0a66c2] text-white rounded hover:bg-[#0a66c2]/90 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AbroadPage;
