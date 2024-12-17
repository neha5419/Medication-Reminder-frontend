import React from "react";
import { Link } from "react-router-dom";

export default function CustomError() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <div className="relative w-32 h-32 mb-6">
        <div className="absolute w-full h-full bg-green-400 rounded-full"></div>
        <div className="absolute w-20 h-20 bg-green-400 rounded-full -top-4 left-1/2 transform -translate-x-1/2"></div>
        <div className="absolute w-6 h-6 bg-white rounded-full top-8 left-8 flex justify-center items-center">
          <div className="w-2 h-2 bg-black rounded-full"></div>
        </div>
        <div className="absolute w-6 h-6 bg-white rounded-full top-8 right-8 flex justify-center items-center">
          <div className="w-2 h-2 bg-black rounded-full"></div>
        </div>
        <div className="absolute w-16 h-6 bg-white rounded-full bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
          <div className="w-10 h-2 bg-black rounded-full"></div>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-500">404</h1>
        <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
        <p className="mt-2 text-lg text-gray-600">
          Our monster ate the page you're looking for!
        </p>
        <Link to="/">
          <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
            Go Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
