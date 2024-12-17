import React from "react";
import { useNavigate } from "react-router-dom";
export default function Body() {
  const navigate = useNavigate();
  function handleStart() {
    navigate("/register");
  }
  return (
    <div>
      <section className="container mx-auto py-12 text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-600">
          Stay Healthy with Medifor
        </h2>
        <p className="text-gray-700 mb-6 text-lg">
          Medifor helps you organize your medication schedule effortlessly and
          ensures you never miss a dose.
        </p>
        <button
          className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition"
          onClick={handleStart}
        >
          Get Started
        </button>
      </section>

      <section className="container mx-auto py-12">
        <h2 className="text-center text-3xl font-bold mb-6">Key Features</h2>
        <div className="grid grid-cols-3 gap-8">
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg text-center">
            <p className="text-2xl font-bold mb-2">⏰</p>
            <h3 className="text-xl font-bold mb-2">Timely Reminders</h3>
            <p>Receive alerts to ensure you take your medicines on time.</p>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow-lg text-center">
            <p className="text-2xl font-bold mb-2">🗓️</p>
            <h3 className="text-xl font-bold mb-2">Easy Scheduling</h3>
            <p>
              Effortlessly plan your medicines with our intuitive interface.
            </p>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow-lg text-center">
            <p className="text-2xl font-bold mb-2">🔔</p>
            <h3 className="text-xl font-bold mb-2">Health Notifications</h3>
            <p>Stay informed about critical health updates and alerts.</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-12 bg-blue-50 rounded-lg">
        <h2 className="text-center text-3xl font-bold mb-6 text-blue-600">
          Health Tips
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>✅ Always take your medicines at the same time every day.</p>
          <p>✅ Set up reminders to avoid missing important doses.</p>
          <p>
            ✅ Keep your healthcare appointments and communicate with your
            doctor.
          </p>
          <p>
            ✅ Drink water regularly and maintain a balanced diet for better
            health.
          </p>
        </div>
      </section>
    </div>
  );
}
