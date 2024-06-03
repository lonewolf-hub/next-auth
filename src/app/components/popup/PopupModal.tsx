import React from 'react';

interface PopupModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const PopupModal: React.FC<PopupModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="popup-container bg-gray p-6 rounded-md shadow-md">
        <div className="popup-content text-black">
          <p>{message}</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="rounded-md px-4 py-2 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
            >
              No
            </button>
            <button
              onClick={onConfirm}
              className="ml-4 rounded-md px-4 py-2 bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
