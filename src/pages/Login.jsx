import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import API_URL from "../utils/constant.jsx";

function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [cookies, setCookie] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      const token = response.data.token;

      setCookie("token", token, { path: "/", maxAge: 7 * 24 * 60 * 60 });
      localStorage.setItem("token", token);

      const decodedToken = decodeJWT(token);

      if (decodedToken && decodedToken.role === "SUPER_ADMIN") {
        navigate("/admin-dash");
      } else {
        navigate("/patient-dash", { state: { userId: decodedToken?.userId } });
      }

      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const forgetPass = () => navigate("/forget-pass");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login
        </h1>
        <input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-4"
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-4"
        />
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className={`w-full rounded-md py-2 mt-4 ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
          } text-white`}
        >
          {isLoading ? (
            <TailSpin
              height={20}
              color="white"
              className="justify-center items-center"
            />
          ) : (
            "Login"
          )}
        </button>

        <button onClick={forgetPass} className="mt-4 text-blue-600">
          Forgot Password?
        </button>
      </div>
    </div>
  );
}
