import { Link } from "react-router-dom";
import { FaHandHoldingMedical } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export default function Header() {

const navigate=useNavigate();
  function handleLogOut(){
    localStorage.removeItem("userId");
    navigate("/login")
  }
  return (
    <div className="bg-blue-500 shadow p-4 flex items-center justify-between">
      {/* Logo with Icon */}
      <div className="flex items-center">
        <FaHandHoldingMedical className="h-12 w-12 text-white" />
        <span className="ml-2 text-white font-bold text-xl">MediFor</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-8">
        <Link
          to="/login"
          className="text-white hover:text-gray-900 font-medium text-2xl"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="text-white hover:text-gray-900 font-medium text-2xl"
        >
          Register
        </Link>
        <Link
          onClick={handleLogOut}
          className="text-white hover:text-gray-900 font-medium text-2xl"
        >
          <div className="flex items-center">
                    <CgLogOut  className="h-10 w-12 text-white -mr-2 hover:text-gray-900 bg-red-500 border-r-2" />
                   
                  </div>
        </Link>
      </nav>
    </div>
  );
}
