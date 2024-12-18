import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import API_URL from "../utils/constant";

export default function RoleSet() {
  const [status, setStatus] = useState({
    email: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);

  // Ensure token exists in cookies
  useEffect(() => {
    if (!cookies.token) {
      toast.error("No token found. Please log in.");
      window.location.href = "/login";  // Redirect to login if token is missing
    }
  }, [cookies]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStatus((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleClick() {
    setIsLoading(true);

    try {
      const role = await axios.patch(`${API_URL}/auth/role-assign`, status, {
        withCredentials: true,  // Include cookies
      });

      console.log(role.data);
      toast.success("Role Set Successfully!");
      setStatus({ email: "", role: "" });
    } catch (error) {
      console.error("Role assignment error:", error);
      toast.error("Role Cannot Be Set. Check Token.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <ToastContainer />
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={status.email}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-4"
        />
        <input
          type="text"
          placeholder="Enter Role"
          name="role"
          value={status.role}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-4"
        />
        <button
          onClick={handleClick}
          disabled={isLoading}
          className={`w-full rounded-md py-2 mt-4 ${isLoading ? "bg-gray-400" : "bg-blue-600"} text-white`}
        >
          {isLoading ? <TailSpin height={20} width={20} color="white" /> : "Assign Role"}
        </button>
      </div>
    </div>
  );
}
