import { useState } from "react";
import axios from "axios";

export default function PasswordResetRequest() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000", // Django backend URL
    withCredentials: true, // Ensure cookies are sent with requests
  });
  const getCSRFToken = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/csrf/");
      axiosInstance.defaults.headers.common["X-CSRFToken"] =
        response.data.csrfToken; // Set token globally
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const csrfToken = await getCSRFToken();
      const response = await axiosInstance.post(
        "/api/v1/users/reset_password/",
        {
          email,
        },
      );
      console.log(response.status);
      if (response.status === 204) {
        setMessage("Email Sent.");
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Failed to send request.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            Send Reset Link
          </button>
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
}
