import React, { createContext, useContext, useState } from 'react';
import type { BookingState, BookingSlot, CustomerDetails } from '../types';
import { generateBookingReference } from '../utils/helpers';

const defaultState: BookingState = {
  step: 1,
  selectedDate: '',
  selectedSlot: null,
  customerDetails: { name: '', phone: '', email: '' },
  agreedToTerms: false,
  paymentStatus: 'pending',
  bookingReference: '',
};

interface BookingContextType {
  state: BookingState;
  setStep: (step: number) => void;
  setDate: (date: string) => void;
  selectSlot: (slot: BookingSlot) => void;
  clearSlot: () => void;
  setCustomerDetails: (details: CustomerDetails) => void;
  setAgreedToTerms: (agreed: boolean) => void;
  setPaymentStatus: (status: BookingState['paymentStatus']) => void;
  confirmBooking: () => string;
  resetBooking: () => void;
  goNext: () => void;
  goBack: () => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BookingState>(defaultState);

  const setStep = (step: number) => setState((s) => ({ ...s, step }));

  const setDate = (date: string) => {
    setState((s) => ({ ...s, selectedDate: date, selectedSlot: null }));
  };

  const selectSlot = (slot: BookingSlot) => {
    setState((s) => ({ ...s, selectedSlot: slot }));
  };

  const clearSlot = () => {
    setState((s) => ({ ...s, selectedSlot: null }));
  };

  const setCustomerDetails = (details: CustomerDetails) => {
    setState((s) => ({ ...s, customerDetails: details }));
  };

  const setAgreedToTerms = (agreed: boolean) => {
    setState((s) => ({ ...s, agreedToTerms: agreed }));
  };

  const setPaymentStatus = (status: BookingState['paymentStatus']) => {
    setState((s) => ({ ...s, paymentStatus: status }));
  };

  const confirmBooking = (): string => {
    const ref = generateBookingReference();
    setState((s) => ({ ...s, bookingReference: ref, step: 7 }));
    return ref;
  };

  const resetBooking = () => {
    setState(defaultState);
  };

  const goNext = () => setState((s) => ({ ...s, step: Math.min(s.step + 1, 7) }));
  const goBack = () => setState((s) => ({ ...s, step: Math.max(s.step - 1, 1) }));

  return (
    <BookingContext.Provider
      value={{
        state,
        setStep,
        setDate,
        selectSlot,
        clearSlot,
        setCustomerDetails,
        setAgreedToTerms,
        setPaymentStatus,
        confirmBooking,
        resetBooking,
        goNext,
        goBack,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be inside BookingProvider');
  return ctx;
}
