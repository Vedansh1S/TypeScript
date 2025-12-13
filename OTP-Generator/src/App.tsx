import React, { useState, useEffect } from "react";

const OtpGenerator: React.FC = () => {
  const [otp, setOtp] = useState<string>("------");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [length, setLength] = useState<number>(6);
  const [isNumeric, setIsNumeric] = useState<boolean>(true);

  const generateOtp = (): void => {
    const numeric = "0123456789";
    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const chars = isNumeric ? numeric : alpha;

    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setOtp(result);
    setTimeLeft(30);
  };

  useEffect(() => {
    if (otp === "------") return;

    setTimeLeft(30);

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setOtp("------");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [otp]);

  // Type: React.ChangeEvent<HTMLInputElement> ensures we access .value safely
  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(Number(e.target.value));
  };

  return (
    // Outer Container (Page Background)
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      {/* Card Component */}
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-slate-200">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Secure OTP</h1>
          <p className="text-slate-500 text-sm mt-1">
            Generate a temporary access code
          </p>
        </div>

        {/* Display Area */}
        <div className="bg-slate-900 rounded-xl p-6 mb-6 text-center relative overflow-hidden">
          <span
            className={`text-4xl font-mono tracking-[0.5em] font-bold ${
              otp === "------" ? "text-slate-600" : "text-green-400"
            }`}
          >
            {otp}
          </span>

          {/* Timer Bar (Visual Flair) */}
          {timeLeft > 0 && (
            <div
              className="absolute bottom-0 left-0 h-1 bg-green-500 transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            ></div>
          )}
        </div>

        {/* Timer Text */}
        <div className="text-center mb-6 h-6">
          {timeLeft > 0 ? (
            <p className="text-orange-500 font-semibold animate-pulse">
              Expires in {timeLeft} seconds
            </p>
          ) : (
            <p className="text-red-500 text-sm font-medium">
              Code Expired or Not Generated
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-4 mb-8">
          {/* Length Control */}
          <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
            <label className="text-slate-700 font-medium text-sm">
              Length (4-12)
            </label>
            <input
              type="number"
              min="4"
              max="12"
              value={length}
              onChange={handleLengthChange}
              className="w-16 p-2 border border-slate-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Type Toggle */}
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
            <span className="text-slate-700 font-medium text-sm">
              Allow Letters?
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={!isNumeric}
                onChange={() => setIsNumeric(!isNumeric)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateOtp}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.98]"
        >
          Generate New Code
        </button>
      </div>
    </div>
  );
};

export default OtpGenerator;
