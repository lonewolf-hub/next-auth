// useSeatAllocation.ts
import { useState, useEffect } from 'react';
import { NUM_SEATS, ALLOCATION_DURATION } from '../constants/constant';

const useSeatAllocation = () => {
  const [seats, setSeats] = useState<Array<{ id: number; allocated: boolean }>>([]);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [showBookModal, setShowBookModal] = useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);

  useEffect(() => {
    // Initialize seats with initial state (unallocated)
    const initialSeats = Array.from({ length: NUM_SEATS }, (_, index) => ({
      id: index + 1,
      allocated: false,
    }));
    setSeats(initialSeats);
  }, []);

  const handleSeatClick = (seatId: number) => {
    setSelectedSeat(seatId);
    setShowBookModal(true);
  };

  const handleBookModalConfirm = (confirmed: boolean) => {
    if (confirmed && selectedSeat !== null) {
      // Update the allocated status of the selected seat
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === selectedSeat ? { ...seat, allocated: true } : seat
        )
      );
  
      // Set a timeout to unallocate the seat after 1 hour
      setTimeout(() => {
        setSeats((prevSeats) =>
          prevSeats.map((seat) =>
            seat.id === selectedSeat ? { ...seat, allocated: false } : seat
          )
        );
  
        // After allocation, show the cancel modal
        // setShowCancelModal(true);
        // Reset selected seat
      }, ALLOCATION_DURATION);
  
      // Close the booking modal
      setShowBookModal(false);
    } else {
      // Reset selected seat and hide the modals if not confirmed
      setShowBookModal(false);
      setShowCancelModal(false);
    }
  };
  const handleCancelClick = () => {
    // Close the booking modal and open the cancel modal
    setShowCancelModal(true);
    setShowBookModal(false);
  };

  const handleCancelModalConfirm = (confirmed: boolean) => {
    if (confirmed && selectedSeat !== null) {
      // Update the allocated status of the selected seat to unallocated
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === selectedSeat ? { ...seat, allocated: false } : seat
        )
      );

      // Reset selected seat and hide the modal only if cancellation is confirmed
      setSelectedSeat(null);
      setShowCancelModal(false);
      setShowBookModal(false);
    } else {
      // Reset selected seat and hide the modal if cancellation is not confirmed
      setSelectedSeat(null);
      setShowCancelModal(false);
      setShowBookModal(false);
    }
  };

  return {
    seats,
    selectedSeat,
    showBookModal,
    showCancelModal,
    handleSeatClick,
    handleBookModalConfirm,
    handleCancelClick,
    handleCancelModalConfirm,
  };
};

export default useSeatAllocation;
