import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Redirect users
import axios from "axios";

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if user is authenticated
  const checkAuth = useCallback(() => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (!token) {
      navigate("/login"); // Redirect to login if no token
    }
  }, [navigate]);
  const handleLogout = async () => {
    try {
      localStorage.removeItem("authToken");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Fetch items from Django API
  const fetchItems = useCallback(async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:8000/api/v1/passwords/`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request headers
        },
      });

      if (response.status === 401) {
        navigate("/login"); // Redirect to login if unauthorized
      }

      const data = await response.json();

      setItems(data);
    } catch {
      setError("There are no passwords.");
    }
  }, [navigate]);

  useEffect(() => {
    checkAuth(); // Check authentication before fetching data
    fetchItems();
  }, [searchQuery, checkAuth, fetchItems]);

  // Handle search passwords
  const handleSearch = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/passwords/?search=${searchQuery}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request
          },
        },
      );

      const data = await response.json();

      setItems(data);
      setSearchQuery("");
    } catch {
      setError("Error to search password.");
    }
  };
  // Handle Delete Item
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/password/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request
          },
        },
      );

      if (response.ok) {
        fetchItems();
      } else {
        setError("Failed to delete item.");
      }
    } catch {
      setError("Error deleting item.");
    }
  };

  // Handle Edit Item (Redirect to Edit Page)
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
      <h1 className="text-2xl font-bold mb-4">Password List</h1>

      {/* Search Bar */}
      <input
        type="text"
        className="w-full max-w-md px-4 py-2 mb-4 border rounded-lg"
        placeholder="Search items..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="mt-4 text-blue-500 text-center w-full"
      >
        Search
      </button>

      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full max-w-3xl bg-white p-4 rounded-lg shadow-lg">
        {items.length === 0 ? (
          <p className="text-gray-600">No password found.</p>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow"
              >
                <div>
                  <p className="font-medium"><strong>Name:</strong> {item.name}</p>
            <p className="text-gray-500 text-sm"><strong>Icon:</strong> {item.icon}</p>
            <p className="text-gray-500 text-sm"><strong>URL:</strong> {item.url}</p>
            <p className="text-gray-500 text-sm"><strong>Username:</strong> {item.username}</p>
            <p className="text-gray-500 text-sm"><strong>Password:</strong> {item.password}</p>
            <p className="text-gray-500 text-sm"><strong>Notes:</strong> {item.notes}</p>
                  {/* <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500 text-sm">{item.icon}</p>
                  <p className="text-gray-500 text-sm">{item.url}</p>
                  <p className="text-gray-500 text-sm">{item.username}</p>
                  <p className="text-gray-500 text-sm">{item.password}</p>
                  <p className="text-gray-500 text-sm">{item.notes}</p> */}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => navigate("/create")}
          className="mt-4 text-blue-500 text-center w-full"
        >
          Add a new password
        </button>
      </div>
    </div>
  );
}
