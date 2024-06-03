import React from 'react';

const UserProfile = ({ params }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      <h1 className="text-4xl font-bold mb-4">Profile</h1>
      <hr className="border-white w-1/4 mb-6" />
      <p className="text-4xl">
       Your Use Id 
        <span className="p-2 rounded bg-orange-500 text-black ml-2">{params.id}</span>
      </p>
    </div>
  );
};

export default UserProfile;
