import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const CreateItem = ({ onItemCreated }) => {
  const navigate = useNavigate(); // For redirection
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    notes: "",
    url: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // 🔹 Check for token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if no token
    }
  }, [navigate]);
  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/v1/passwords/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in request headers
        },
        body: JSON.stringify({
          name: formData.name,
          icon: formData.icon,
          notes: formData.notes,
          url: formData.url,
          username: formData.username,
          password: formData.password,
        }),
      });

      setMessage("Password created successfully!");
      setFormData({
        name: "",
        icon: "",
        notes: "",
        url: "",
        username: "",
        password: "",
      });

      if (onItemCreated) onItemCreated(); // Refresh list if needed
      // navigate("/passwords");
    } catch (error) {
      setMessage("Failed to create Password");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Item</h2>

      {message && <p className="text-green-600 mb-2">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* <input type="hidden" name="user" value={formData.user} /> */}
        <input
          type="text"
          name="name"
          placeholder="Name URL"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="icon"
          placeholder="Icon"
          value={formData.icon}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <textarea
          type="text"
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="url"
          placeholder="Website URL"
          value={formData.url}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Create Password
        </button>
      </form>
      <button
        onClick={() => navigate("/passwords")}
        className="mt-4 text-blue-500 text-center w-full"
      >
        List password
      </button>
    </div>
  );
};

export default CreateItem;
