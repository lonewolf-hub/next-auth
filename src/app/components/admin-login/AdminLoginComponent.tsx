"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

const AdminLoginPage = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onAdminLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/admin/login", admin);
      console.log("Admin login success", response.data);
      toast.success("Admin Login Success");
      // Redirect to admin dashboard or any other admin-specific page
      router.push("/profile");
    } catch (error: any) {
      console.log("Admin Login failed", error.message);
      toast.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin.email.length > 0 && admin.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [admin]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-secondary-color ">
        <div className="bg-primary p-8 rounded shadow-md w-full max-w-md ">
          <h1 className="text-3xl font-bold mb-4 ">{loading ? "Processing" : "Admin Login"}</h1>
          <form className="flex flex-col">
            <label htmlFor="adminEmail" className="text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              className="border border-gray-500 p-2 mb-4 rounded focus:outline-none focus:border-blue-500 bg-transparent"
              id="adminEmail"
              type="email"
              value={admin.email}
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
              placeholder="Enter your email"
            />

            <label htmlFor="adminPassword" className="text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              className="border border-gray-500 p-2 mb-4 rounded focus:outline-none focus:border-blue-500 bg-transparent"
              id="adminPassword"
              type="password"
              value={admin.password}
              onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
              placeholder="Enter your password"
            />

            <button
              onClick={onAdminLogin}
              className={`p-2 border rounded focus:outline-none ${
                buttonDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-accent text-white hover:bg-blue-600'
              }`}
              disabled={buttonDisabled || loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="mt-4 text-sm text-gray-600">
              <Link href="/signup" className="text-maincolor hover:underline">
                Don't have an account? signup as an user
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
