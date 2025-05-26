import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { format, addDays, isSameDay, isAfter, startOfDay } from 'date-fns';
import toast from 'react-hot-toast';
import type { Influencer, BookingRequest } from '../types';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    influencer: Influencer;
    onBooking: (booking: BookingRequest) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
    isOpen,
    onClose,
    influencer,
    onBooking
}) => {
    const [selectedDuration, setSelectedDuration] = useState<number>(30);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [message, setMessage] = useState('');

    const durations = [
        { value: 30, label: '30 minutes', price: influencer.hourlyRate * 0.5 },
        { value: 60, label: '1 hour', price: influencer.hourlyRate },
        { value: 90, label: '1.5 hours', price: influencer.hourlyRate * 1.5 },
    ];

    // Generate next 14 days for date selection
    const availableDates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i + 1));

    // Mock available time slots (in a real app, this would come from the influencer's availability)
    const timeSlots = [
        '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'
    ];

    const handleBooking = () => {
        if (!selectedDate || !selectedTime) {
            toast.error('Please select a date and time');
            return;
        }

        const booking: BookingRequest = {
            influencerId: influencer.id,
            date: new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${selectedTime}`),
            duration: selectedDuration,
            message: message.trim() || undefined
        };

        onBooking(booking);
        onClose();

        // Reset form
        setSelectedDate(null);
        setSelectedTime('');
        setMessage('');
        setSelectedDuration(30);
    };

    const selectedDurationData = durations.find(d => d.value === selectedDuration);
    const totalPrice = selectedDurationData?.price || 0;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex items-center justify-between mb-6">
                                    <Dialog.Title className="text-2xl font-bold text-gray-900">
                                        Book a Call
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                {/* Influencer Info */}
                                <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
                                    <img
                                        src={influencer.avatar}
                                        alt={influencer.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{influencer.name}</h3>
                                        <p className="text-blue-600">{influencer.category}</p>
                                        <p className="text-gray-600">${influencer.hourlyRate}/hour</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Duration Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Call Duration
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {durations.map((duration) => (
                                                <button
                                                    key={duration.value}
                                                    onClick={() => setSelectedDuration(duration.value)}
                                                    className={`p-3 rounded-lg border text-center transition-colors ${selectedDuration === duration.value
                                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                        }`}
                                                >
                                                    <div className="font-medium">{duration.label}</div>
                                                    <div className="text-sm text-gray-600">
                                                        ${duration.price}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Date Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Select Date
                                        </label>
                                        <div className="grid grid-cols-7 gap-2">
                                            {availableDates.map((date) => {
                                                const isSelected = selectedDate && isSameDay(date, selectedDate);
                                                const isAvailable = isAfter(date, startOfDay(new Date()));

                                                return (
                                                    <button
                                                        key={date.toISOString()}
                                                        onClick={() => isAvailable && setSelectedDate(date)}
                                                        disabled={!isAvailable}
                                                        className={`p-2 rounded-lg text-center transition-colors ${isSelected
                                                            ? 'border-blue-500 bg-blue-50 text-blue-700 border-2'
                                                            : isAvailable
                                                                ? 'border-gray-300 hover:border-gray-400 border'
                                                                : 'border-gray-200 text-gray-400 cursor-not-allowed border'
                                                            }`}
                                                    >
                                                        <div className="text-xs">{format(date, 'EEE')}</div>
                                                        <div className="text-sm font-medium">{format(date, 'd')}</div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Time Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Select Time
                                        </label>
                                        {selectedDate ? (
                                            <div className="grid grid-cols-4 gap-2">
                                                {timeSlots.map((time) => (
                                                    <button
                                                        key={time}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`p-2 rounded-lg text-center transition-colors ${selectedTime === time
                                                            ? 'border-blue-500 bg-blue-50 text-blue-700 border-2'
                                                            : 'border-gray-300 hover:border-gray-400 border'
                                                            }`}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-600 text-center py-4">
                                                Please select a date first
                                            </p>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Message (Optional)
                                        </label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Tell the influencer what you'd like to discuss..."
                                            rows={3}
                                            className="input-field resize-none"
                                        />
                                    </div>

                                    {/* Booking Summary */}
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-gray-900 mb-2">Booking Summary</h4>
                                        <div className="space-y-1 text-sm">
                                            <div className="flex justify-between">
                                                <span>Duration:</span>
                                                <span>{selectedDurationData?.label}</span>
                                            </div>
                                            {selectedDate && (
                                                <div className="flex justify-between">
                                                    <span>Date:</span>
                                                    <span>{format(selectedDate, 'MMM d, yyyy')}</span>
                                                </div>
                                            )}
                                            {selectedTime && (
                                                <div className="flex justify-between">
                                                    <span>Time:</span>
                                                    <span>{selectedTime}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between font-semibold text-lg pt-2 border-t border-blue-200">
                                                <span>Total:</span>
                                                <span>${totalPrice}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3 pt-4">
                                        <button
                                            onClick={onClose}
                                            className="btn-secondary flex-1"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleBooking}
                                            disabled={!selectedDate || !selectedTime}
                                            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Book Call - ${totalPrice}
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default BookingModal; 