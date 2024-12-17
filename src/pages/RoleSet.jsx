import { useState } from "react";
import { useCookies } from "react-cookie";
import API_URL from "../utils/constant";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";

export default function RoleSet() {
  axios.defaults.withCredentials = true;

  const [status, setStatus] = useState({
    email: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setStatus((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleClick() {
    setIsLoading(true);
    try {
      const role = await axios.patch(`${API_URL}/auth/role-assign`, status, {
        withCredentials: true,
      });

      console.log(role.data);
      toast.success("Role Set Successfully!");
      setStatus({
        email: "",
        role: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Role Cannot Be Set");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <ToastContainer />
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Set Role
        </h1>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={status.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter Role"
          name="role"
          value={status.role}
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
            "Change Role"
          )}
        </button>
      </div>
    </div>
  );
}
