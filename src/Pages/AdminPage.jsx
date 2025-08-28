import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [usernameSearch, setUsernameSearch] = useState("");
  const [emailSearch, setEmailSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("/admin/allUsers");
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`/admin/delete/${id}`);
      console.log("User deleted:", response.data);
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const addUser = () => {
    navigate("/SignUp");
  };

  // 🔎 Search Handlers
  const handleUsernameSearch = (e) => {
    e.preventDefault();
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(usernameSearch.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleEmailSearch = (e) => {
    e.preventDefault();
    const filtered = users.filter((user) =>
      user.email.toLowerCase().includes(emailSearch.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-6 bg-gray-100">
        {/* Header Card */}
        <div className="w-full max-w-4xl p-6 mb-6 text-center bg-white rounded-lg shadow-md">
          <h1 className="mb-2 text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome to the admin dashboard.</p>
        </div>

        {/* Search Section */}
        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 mb-6 md:grid-cols-3">
          {/* Search by Username */}
          <form onSubmit={handleUsernameSearch} className="relative">
            <input
              type="search"
              value={usernameSearch}
              onChange={(e) => setUsernameSearch(e.target.value)}
              placeholder="Search by Username"
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="absolute right-2.5 bottom-2.5 px-3 py-1 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </form>

          {/* Add User Button */}
          <button
            className="px-3 py-1 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            onClick={addUser}
          >
            Add User
          </button>

          {/* Search by Email */}
          <form onSubmit={handleEmailSearch} className="relative">
            <input
              type="search"
              value={emailSearch}
              onChange={(e) => setEmailSearch(e.target.value)}
              placeholder="Search by Email"
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="absolute right-2.5 bottom-2.5 px-3 py-1 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>

        {/* Users Table */}
        <div className="w-full max-w-6xl overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border border-gray-300">S. No</th>
                <th className="px-4 py-2 border border-gray-300">Username</th>
                <th className="px-4 py-2 border border-gray-300">Email</th>
                <th className="px-4 py-2 border border-gray-300">Id</th>
                <th className="px-4 py-2 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user._id} className="text-center hover:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                    <td className="px-4 py-2 border border-gray-300">{user.username}</td>
                    <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                    <td className="px-4 py-2 border border-gray-300">{user._id}</td>
                    <td className="px-4 py-2 border border-gray-300">
                      <button
                        className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
