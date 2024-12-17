import { useState } from "react";
import API_URL from "../utils/constant.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, info);
      toast.success("Registration successful! Please log in.");
      setInfo({ name: "", email: "", password: "" });
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <ToastContainer />
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Register
        </h1>

        <input
          type="text"
          placeholder="Enter Your Name"
          name="name"
          value={info.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          value={info.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Enter Your Password"
          name="password"
          value={info.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleClick}
          disabled={isLoading}
          className={`w-full text-white font-bold py-2 px-4 rounded-md transition ${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <TailSpin height={20} width={20} color="white" />
            </div>
          ) : (
            "Register"
          )}
        </button>
      </div>
    </div>
  );
}
