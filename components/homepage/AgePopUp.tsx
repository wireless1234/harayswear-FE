"use client";

import React, { useState, useEffect } from 'react'

const AgePopUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already verified their age
    const ageVerified = localStorage.getItem('ageVerified');
    if (!ageVerified) {
      setIsVisible(true);
    }
  }, []);

  const handleYes = () => {
    localStorage.setItem('ageVerified', 'true');
    setIsVisible(false);
  };

  const handleNo = () => {
    setIsVisible(false);
    // Redirect to an external site or show an appropriate message
    window.location.href = 'https://www.google.com';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Age Verification</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Age restricted products, please confirm you are over 18 years old.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleYes}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Yes, I&apos;m over 18
          </button>
          <button
            onClick={handleNo}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            No, I&apos;m under 18
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgePopUp