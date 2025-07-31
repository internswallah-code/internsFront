import { useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bgImg from "./back.png";

const TimePicker = ({ selectedDate, onDateChange, onTimeChange, onClose }) => {
  const [isHourView, setIsHourView] = useState(true);
  const [selectedHour, setSelectedHour] = useState(7);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [period, setPeriod] = useState("AM");
  const [showClock, setShowClock] = useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const formatNumber = (num) => num.toString().padStart(2, "0");

  const handleTimeClick = (value) => {
    if (isHourView) {
      setSelectedHour(value);
      setIsHourView(false);
    } else {
      setSelectedMinute(value);
      onTimeChange(
        `${formatNumber(selectedHour)}:${formatNumber(value)} ${period}`
      );
    }
  };

  const handleDateSelect = (date) => {
    onDateChange(date);
    setShowClock(true);
  };

  return (
    <div className="bg-white p-4 rounded-lg w-[90vw] max-w-[320px] shadow-lg">
      <div className="grid gap-4">
        {!showClock ? (
          <DatePicker
            selected={selectedDate}
            onChange={handleDateSelect}
            inline
          />
        ) : (
          <>
            <div className="flex items-center justify-center gap-2 text-3xl font-light">
              <button
                onClick={() => setIsHourView(true)}
                className={`p-2 rounded ${
                  isHourView ? "bg-[#0a66c2] text-white" : ""
                }`}
              >
                {formatNumber(selectedHour)}
              </button>
              <span>:</span>
              <button
                onClick={() => setIsHourView(false)}
                className={`p-2 rounded ${
                  !isHourView ? "bg-[#0a66c2] text-white" : ""
                }`}
              >
                {formatNumber(selectedMinute)}
              </button>
              <div className="flex flex-col gap-1 ml-2 text-sm">
                <button
                  onClick={() => setPeriod("AM")}
                  className={`px-2 py-1 rounded ${
                    period === "AM" ? "bg-[#0a66c2] text-white" : "bg-gray-100"
                  }`}
                >
                  AM
                </button>
                <button
                  onClick={() => setPeriod("PM")}
                  className={`px-2 py-1 rounded ${
                    period === "PM" ? "bg-[#0a66c2] text-white" : "bg-gray-100"
                  }`}
                >
                  PM
                </button>
              </div>
            </div>

            <div className="relative w-60 h-60 mx-auto bg-gray-100 rounded-full border-4 border-[#0a66c2]">
              {(isHourView ? hours : minutes).map((number, index) => {
                const angle = (index * 30 - 90) * (Math.PI / 180);
                const radius = 100;
                const x = radius * Math.cos(angle) + 120;
                const y = radius * Math.sin(angle) + 120;
                const isSelected = isHourView
                  ? number === selectedHour
                  : number === selectedMinute;
                return (
                  <button
                    key={number}
                    onClick={() => handleTimeClick(number)}
                    className={`absolute w-10 h-10 -mt-5 -ml-5 rounded-full flex items-center justify-center text-sm ${
                      isSelected
                        ? "bg-[#0a66c2] text-white"
                        : "hover:bg-gray-200"
                    }`}
                    style={{ left: `${x}px`, top: `${y}px` }}
                  >
                    {formatNumber(number)}
                  </button>
                );
              })}
              <div
                className="absolute w-1 bg-[#0a66c2] origin-bottom rounded-full left-1/2 -translate-x-1/2"
                style={{
                  height: "40%",
                  top: "10%",
                  transform: `rotate(${
                    (isHourView
                      ? (selectedHour % 12) * 30
                      : selectedMinute * 6) - 90
                  }deg)`,
                }}
              />
            </div>
          </>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[#0a66c2] hover:bg-gray-100 rounded"
          >
            CANCEL
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#0a66c2] hover:bg-[#0a66c2]/90 text-white rounded"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default function BookPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col justify-center items-center px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-6 md:mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow">
            Book A <span className="text-[#0a66c2]">1:1</span> Counselling
            Session
          </h1>
          <p className="text-white text-sm md:text-lg mt-2">
            Book with expert mentors and shape your career path
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-5 md:p-8 w-full max-w-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setShowPopup(true); // Show the Thank You popup
            }}
          >
            {" "}
            <div>
              <label
                htmlFor="concerns"
                className="block text-sm font-medium text-gray-700"
              >
                What would you like to discuss?
              </label>
              <input
                id="concerns"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0a66c2] focus:border-[#0a66c2]"
                placeholder="E.g., career doubts, resume help..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-center">
                Choose a time slot
              </label>
              <div className="mt-2 flex justify-center items-center">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="px-4 py-2 bg-[#0a66c2] text-white rounded hover:bg-[#0a66c2]/90 transition"
                >
                  {selectedDate.toDateString()} {selectedTime || "Select Time"}
                </button>
              </div>
            </div>
            {isOpen && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
                <TimePicker
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                  onTimeChange={handleTimeChange}
                  onClose={() => setIsOpen(false)}
                />
              </div>
            )}
            <motion.button
              type="submit"
              className="w-full bg-[#0a66c2] hover:bg-[#0a66c2]/90 text-white font-medium py-2 rounded-md transition shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              BOOK A SESSION
            </motion.button>
            {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
                  <div className="text-4xl mb-2">🎓</div>
                  <h2 className="text-xl font-semibold mb-2">Thank You!</h2>
                  <p className="text-gray-600 mb-4">
                    We've received your request. You'll hear from us shortly!
                  </p>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="px-4 py-2 bg-[#0a66c2] text-white rounded hover:bg-[#0a66c2]/90"
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
