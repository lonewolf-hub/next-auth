"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Navbar from '../components/navbar/Navbar';

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login success", response.data);
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-secondary-color ">
      <div className="bg-primary p-8 rounded shadow-md w-full max-w-md ">
        <h1 className="text-3xl font-bold mb-4 ">{loading ? "Processing" : "User Login"}</h1>
        <form className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            className="border border-gray-500 p-2 mb-4 rounded focus:outline-none focus:border-blue-500 bg-transparent"
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
          />

          <label htmlFor="password" className="text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            className="border border-gray-500 p-2 mb-4 rounded focus:outline-none focus:border-blue-500 bg-transparent"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
          />

          <button
            onClick={onLogin}
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
              Don't have an account? Sign up here
            </Link>
          </div>
          <div className=" text-sm text-gray-600">
            <Link href="/admin-login" className="text-maincolor hover:underline">
              if you are an admin login here..
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
