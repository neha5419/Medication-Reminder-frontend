import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
const AdminDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [filterUserId, setFilterUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      if (filterUserId) {
        const response = await axios.get(`${API_URL}/logs/admin`, {
          params: { userId: filterUserId },
        });
        setLogs(response.data.logs);
      }
    } catch (error) {
      console.error("Failed to fetch logs", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = () => {
    fetchLogs();
  };

  function changeRole() {
    navigate("/role-set");
  }
  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <div className="mb-4 flex space-x-4 ">
        <input
          type="number"
          placeholder="Enter User ID"
          onChange={(e) => setFilterUserId(e.target.value)}
          className="border rounded p-2"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Apply Filter
        </button>
        <button
          onClick={changeRole}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Set Role
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">User ID</th>
              <th className="py-2 px-4 border-b">User Name</th>
              <th className="py-2 px-4 border-b">Medicine Name</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <div className="flex justify-center items-center">
                <TailSpin
                  height={40}
                  width={40}
                  color="blue"
                  className="ml-96"
                />
              </div>
            ) : logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id}>
                  <td className="py-2 px-4 border-b text-center">
                    {log.userId}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {log.user?.name}
                  </td>

                  <td className="py-2 px-4 border-b text-center">
                    {log.medicine.name}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {log.status}
                  </td>

                  <td className="py-2 px-4 border-b text-center">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
