import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    VideoCameraIcon,
    CalendarIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    PlayIcon,
    DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import { mockVideoCalls, mockInfluencers, currentUser } from '../data/mockData';
import { format } from 'date-fns';

const MyCalls: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

    // Filter calls for current user
    const userCalls = mockVideoCalls.filter(call => call.userId === currentUser.id);

    const getInfluencer = (influencerId: string) => {
        return mockInfluencers.find(inf => inf.id === influencerId);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'scheduled':
                return 'text-blue-600 bg-blue-100';
            case 'ongoing':
                return 'text-green-600 bg-green-100';
            case 'completed':
                return 'text-gray-600 bg-gray-100';
            case 'cancelled':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'text-green-600 bg-green-100';
            case 'pending':
                return 'text-yellow-600 bg-yellow-100';
            case 'refunded':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const filteredCalls = userCalls.filter(call => {
        switch (activeTab) {
            case 'upcoming':
                return call.status === 'scheduled' || call.status === 'ongoing';
            case 'completed':
                return call.status === 'completed';
            case 'cancelled':
                return call.status === 'cancelled';
            default:
                return true;
        }
    });

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-secondary-900 mb-4">
                    My Video Calls
                </h1>
                <p className="text-lg text-secondary-600">
                    Manage your scheduled and completed calls
                </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center">
                <div className="flex space-x-1 bg-secondary-100 p-1 rounded-lg">
                    {[
                        { key: 'upcoming', label: 'Upcoming', count: userCalls.filter(c => c.status === 'scheduled' || c.status === 'ongoing').length },
                        { key: 'completed', label: 'Completed', count: userCalls.filter(c => c.status === 'completed').length },
                        { key: 'cancelled', label: 'Cancelled', count: userCalls.filter(c => c.status === 'cancelled').length }
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === tab.key
                                ? 'bg-white text-primary-600 shadow-sm'
                                : 'text-secondary-600 hover:text-secondary-900'
                                }`}
                        >
                            {tab.label} ({tab.count})
                        </button>
                    ))}
                </div>
            </div>

            {/* Calls List */}
            <div className="space-y-4">
                {filteredCalls.length === 0 ? (
                    <div className="text-center py-12">
                        <VideoCameraIcon className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                            No {activeTab} calls
                        </h3>
                        <p className="text-secondary-600 mb-4">
                            {activeTab === 'upcoming'
                                ? "You don't have any upcoming calls scheduled."
                                : `You don't have any ${activeTab} calls.`
                            }
                        </p>
                        {activeTab === 'upcoming' && (
                            <Link to="/influencers" className="btn-primary">
                                Browse Influencers
                            </Link>
                        )}
                    </div>
                ) : (
                    filteredCalls.map((call) => {
                        const influencer = getInfluencer(call.influencerId);
                        if (!influencer) return null;

                        return (
                            <div key={call.id} className="card p-6">
                                <div className="flex items-start space-x-4">
                                    <img
                                        src={influencer.avatar}
                                        alt={influencer.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-lg font-semibold text-secondary-900">
                                                    {influencer.name}
                                                </h3>
                                                <p className="text-primary-600 font-medium">
                                                    {influencer.category}
                                                </p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(call.status)}`}>
                                                    {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                                                </span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(call.paymentStatus)}`}>
                                                    {call.paymentStatus.charAt(0).toUpperCase() + call.paymentStatus.slice(1)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center space-x-2 text-secondary-600">
                                                <CalendarIcon className="h-4 w-4" />
                                                <span className="text-sm">
                                                    {format(call.scheduledAt, 'MMM d, yyyy')}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-secondary-600">
                                                <ClockIcon className="h-4 w-4" />
                                                <span className="text-sm">
                                                    {format(call.scheduledAt, 'h:mm a')} ({call.duration} min)
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-secondary-600">
                                                <span className="text-sm font-medium">
                                                    ${call.amount}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center space-x-3">
                                            {call.status === 'scheduled' && (
                                                <>
                                                    <button className="btn-primary text-sm px-4 py-2">
                                                        <VideoCameraIcon className="h-4 w-4 inline mr-1" />
                                                        Join Call
                                                    </button>
                                                    <button className="btn-secondary text-sm px-4 py-2">
                                                        Reschedule
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                                                        Cancel
                                                    </button>
                                                </>
                                            )}

                                            {call.status === 'ongoing' && (
                                                <button className="btn-primary text-sm px-4 py-2 animate-pulse">
                                                    <VideoCameraIcon className="h-4 w-4 inline mr-1" />
                                                    Rejoin Call
                                                </button>
                                            )}

                                            {call.status === 'completed' && (
                                                <div className="flex items-center space-x-3">
                                                    {call.recordingUrl && (
                                                        <button className="btn-secondary text-sm px-4 py-2">
                                                            <PlayIcon className="h-4 w-4 inline mr-1" />
                                                            View Recording
                                                        </button>
                                                    )}
                                                    <button className="btn-secondary text-sm px-4 py-2">
                                                        <DocumentArrowDownIcon className="h-4 w-4 inline mr-1" />
                                                        Download Receipt
                                                    </button>
                                                    <Link
                                                        to={`/influencers/${influencer.id}`}
                                                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                                                    >
                                                        Book Again
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Quick Actions */}
            {filteredCalls.length > 0 && (
                <div className="bg-primary-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                        Quick Actions
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        <Link to="/influencers" className="btn-primary">
                            Book New Call
                        </Link>
                        <button className="btn-secondary">
                            Download All Receipts
                        </button>
                        <button className="btn-secondary">
                            Export Call History
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCalls; 