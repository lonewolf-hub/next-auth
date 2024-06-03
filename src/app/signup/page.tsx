"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Navbar from '../components/navbar/Navbar';

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      toast.success("Signup Success");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error);

      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;

        if (errorMessage === 'User already exists') {
          setError("User with this email or username already exists");
        } else {
          setError(errorMessage || "Signup failed. Please check your input.");
        }
      } else {
        toast.error("Signup failed. Please try again later.");
        setError("Signup failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen  bg-secondary-color ">
      <div className="bg-primary p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">{loading ? "Processing" : "Register"}</h1>
        <form className="flex flex-col">
          <label htmlFor="username" className="text-sm font-medium text-gray-600 mb-1">
            Username
          </label>
          <input
            className="border border-gray-500 p-2 mb-4 rounded focus:outline-none focus:border-blue-500"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Enter your username"
          />

          <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            className="border border-gray-500 p-2 mb-4 rounded focus:outline-none focus:border-blue-500"
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
            className="border border-gray-500 p-2 mb-4 rounded focus:outline-none focus:border-blue-500"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
          />

          <button
            onClick={onSignup}
            className={`p-2 border rounded focus:outline-none ${
              buttonDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-accent text-white hover:bg-blue-600'
            }`}
            disabled={buttonDisabled || loading}
          >
            {buttonDisabled ? "Fill in all fields to register" : "Register"}
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <div className="mt-4 text-sm text-gray-600">
            <Link href="/login" className="text-maincolor hover:underline">
              Already signed up? Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default SignupPage;
