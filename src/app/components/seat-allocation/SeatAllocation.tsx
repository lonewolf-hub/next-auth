"use client"
import React from 'react';
import useSeatAllocation from './hooks/hooks';
import PopupModal from '../popup/PopupModal';

const SeatAllocation: React.FC = () => {
    const {
        seats,
        selectedSeat,
        showBookModal,
        showCancelModal,
        handleSeatClick,
        handleBookModalConfirm,
        handleCancelClick,
        handleCancelModalConfirm,
    } = useSeatAllocation();

    return (
        <>
            <div className='flex flex-col bg-secondary-color  '>
            <div className='flex text-3xl text-black items-center justify-center py-5'>
                    Allocate Your Seat Using Our E-Seat Allocation
                </div>  
            <div className="flex flex-wrap justify-center">
               
                {seats.map((seat) => (
                    <div
                        key={seat.id}
                        className={`w-1/5 p-4 m-3 border-2 border-black rounded-lg text-white font-bold text-lg cursor-pointer ${seat.allocated ? 'bg-red-500' : 'bg-green-500'}`}
                        onClick={() => handleSeatClick(seat.id)}
                    >
                        Seat {seat.id}
                        {seat.allocated && <span className="ml-2 text-sm">(Allocated)</span>}
                        {seat.allocated && (
                            <button
                                className="ml-2 px-4  bg-maincolor text-white rounded"
                                onClick={() => handleCancelClick()}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                ))}

                {showBookModal && (
                    <PopupModal
                        isOpen={showBookModal}
                        onClose={() => handleBookModalConfirm(false)}
                        onConfirm={() => handleBookModalConfirm(true)}
                        message={`Do you want to book Seat ${selectedSeat} for 1 hour?`}
                    />
                )}

                {showCancelModal && (
                    <PopupModal
                        isOpen={showCancelModal}
                        onClose={() => handleCancelModalConfirm(false)}
                        onConfirm={() => handleCancelModalConfirm(true)}
                        message={`Do you want to cancel the booking for Seat ${selectedSeat}?`}
                    />
                )}
            </div>
            </div>
        </>
    );
};

export default SeatAllocation;
