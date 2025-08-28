import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

export default function UserPage() {
  const { username: usernameParam } = useParams();

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = usernameParam ||  "N/A";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/admin/userName/${username}`);
        setUserDetails(res.data);
      } catch (err) {
        setError("Failed to fetch user details", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (username !== "N/A") {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [username]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }
  const email = userDetails?.data?.email || "N/A";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 text-center bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold">User Details</h1>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
    </div>
  );
}
