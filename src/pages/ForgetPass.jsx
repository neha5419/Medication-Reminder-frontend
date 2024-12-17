import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import API_URL from "../utils/constant";
export default function ForgetPass() {
  const [forget, setForget] = useState({
    email: "",
    newPass: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForget((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleForget() {
    setIsLoading(true);
    try {
      const response = await axios.patch(`${API_URL}/auth/forget-pass`, forget);
      console.log(response.data);
      toast.success("Password Changed Successfully");
      setForget({
        email: "",
        newPass: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Cannot Change Password");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <ToastContainer />
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Change Password
        </h1>

        <input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          value={forget.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Enter Your New Password"
          name="newPass"
          value={forget.newPass}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleForget}
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
            "Change Password"
          )}
        </button>
      </div>
    </div>
  );
}
