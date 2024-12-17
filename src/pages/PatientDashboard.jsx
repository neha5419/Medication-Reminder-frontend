import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import API_URL from "../utils/constant.jsx";
import { useCookies } from "react-cookie";

const PatientDashboard = () => {
  const { state } = useLocation();
  const { userId } = state;
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    dosage: "",
    scheduleTime: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMedicines();
  }, [userId]);

  const fetchMedicines = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/medicines/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMedicines(response.data.medicines);
    } catch (err) {
      setError("Error fetching medicines. Please try again.");
      console.error(err);
    }
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/medicines/add`,
        { ...newMedicine, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMedicines((prev) => [...prev, response.data.medicine]);
      setNewMedicine({ name: "", dosage: "", scheduleTime: "" });
      setError("");
    } catch (err) {
      setError("Error adding medicine. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMedicine = async (medicineId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/medicines/${medicineId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMedicines((prev) =>
        prev.filter((medicine) => medicine.id !== medicineId)
      );
    } catch (err) {
      setError("Error deleting medicine. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
        Patient Dashboard
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <form
        onSubmit={handleAddMedicine}
        className="bg-white shadow-md rounded-lg p-4 mb-6"
      >
        <h2 className="text-xl font-bold mb-4">Add New Medicine</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <input
            type="text"
            placeholder="Medicine Name"
            value={newMedicine.name}
            onChange={(e) =>
              setNewMedicine({ ...newMedicine, name: e.target.value })
            }
            required
            className="border border-gray-300 rounded-md p-2"
          />
          <input
            type="text"
            placeholder="Dosage"
            value={newMedicine.dosage}
            onChange={(e) =>
              setNewMedicine({ ...newMedicine, dosage: e.target.value })
            }
            required
            className="border border-gray-300 rounded-md p-2"
          />
          <input
            type="datetime-local"
            value={newMedicine.scheduleTime}
            onChange={(e) =>
              setNewMedicine({ ...newMedicine, scheduleTime: e.target.value })
            }
            required
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded-md ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Medicine"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medicines.map((medicine) => (
          <div
            key={medicine.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
          >
            <h2 className="text-lg font-bold">{medicine.name}</h2>
            <p>Dosage: {medicine.dosage}</p>
            <p>
              Schedule:{" "}
              {new Date(medicine.scheduleTime).toLocaleString("en-US")}
            </p>
            <div className="flex justify-between items-center mt-4">
              <button
                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                onClick={() => handleDeleteMedicine(medicine.id)}
              >
                Delete
              </button>
              <AcknowledgmentButton medicineId={medicine.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AcknowledgmentButton = ({ medicineId }) => {
  const [ackStatus, setAckStatus] = useState("");
  const [cookies] = useCookies(["token"]);
  const handleAcknowledge = async (status) => {
    try {
      const token = cookies.token;

      if (!token) {
        console.error("Token not found in cookies.");
        return;
      }

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.userId;

      console.log({ status, userId, medicineId });

      const response = await axios.post(`${API_URL}/logs/log`, {
        status,
        userId,
        medicineId,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Request failed:", error.message);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <button
        className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 "
        onClick={() => handleAcknowledge("TAKEN")}
        disabled={ackStatus === "TAKEN"}
      >
        Taken
      </button>
      <button
        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-3"
        onClick={() => handleAcknowledge("MISSED")}
        disabled={ackStatus === "MISSED"}
      >
        Missed
      </button>
    </div>
  );
};

export default PatientDashboard;
