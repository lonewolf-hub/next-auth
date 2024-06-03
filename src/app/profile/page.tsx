"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import PopupModal from '../components/popup/PopupModal';
import Navbar from '../components/navbar/Navbar';

interface UserData {
  username: string;
  role: string; // Add role to UserData
}

interface UserProfileProps {
  params: {
    id: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ params }: UserProfileProps) => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const getUserDetails = async () => {
  try {
    const userRes = await axios.get('/api/users/user');
    console.log('User Response:', userRes.data);

    let userData: UserData | null = null;

    if (userRes.data.data.role === 'admin') {
      try {
        const adminRes = await axios.get('/api/admin/admin');
        console.log('Admin Response:', adminRes.data);

        userData = { ...adminRes.data.data, role: 'admin' };
      } catch (adminError: any) {
        if (adminError.response && adminError.response.status === 403) {
          // Handle 403 (Forbidden) for admin endpoint
          console.log('User is not an admin');
          userData = { ...userRes.data.data, role: 'user' };
        } else {
          throw adminError;
        }
      }
    } else {
      userData = { ...userRes.data.data, role: 'user' };
    }

    console.log('Final UserData:', userData);
    setUserData(userData);
  } catch (error: any) {
    console.error(error.message);
    toast.error(error.message);
  }
};


  useEffect(() => {
    getUserDetails();
  }, []);

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleConfirmLogout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      router.push('/login');
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-secondary-color text-white">
        <h1 className="text-4xl font-bold mb-4 text-black">
          Welcome, {userData?.username || 'Guest'}
        </h1>
        <hr className="border-white w-1/4 mb-6" />
        <h2 className="p-3 rounded bg-indigo-600">
          {userData?.role === 'admin' ? 'You are an admin!' : 'You are a user!'}
        </h2>
        <hr className="border-white w-1/4 my-6" />
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>

        <button
          onClick={getUserDetails}
          className="bg-green-800 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Refresh User Details
        </button>

        <PopupModal
          isOpen={isLogoutModalOpen}
          onClose={handleCloseLogoutModal}
          onConfirm={handleConfirmLogout}
          message="Are you sure you want to logout?"
        />
      </div>
    </>
  );
};

export default UserProfile;
