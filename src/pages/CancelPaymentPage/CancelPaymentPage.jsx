import React from 'react';
import './CancelPaymentPage.css';
import { useNavigate } from "react-router-dom";

const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center p-6">
      <h2 className="text-3xl font-bold text-red-600 mb-4">Payment Canceled ❌</h2>
      <p className="text-gray-700 mb-6">
        Your payment was not completed. You can try again or return to the home page.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default CancelPage;
