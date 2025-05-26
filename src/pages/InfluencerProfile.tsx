import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    StarIcon,
    CheckBadgeIcon,
    CalendarIcon,
    ClockIcon,
    UserGroupIcon,
    VideoCameraIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { mockInfluencers } from '../data/mockData';
import BookingModal from '../components/BookingModal';

const InfluencerProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const influencer = mockInfluencers.find(inf => inf.id === id);

    if (!influencer) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">
                    Influencer not found
                </h2>
                <Link to="/influencers" className="btn-primary">
                    Back to Influencers
                </Link>
            </div>
        );
    }

    const socialPlatforms = Object.entries(influencer.socialLinks).filter(([_, value]) => value);

    return (
        <div className="space-y-8">
            {/* Back Button */}
            <Link
                to="/influencers"
                className="inline-flex items-center space-x-2 text-secondary-600 hover:text-secondary-900 transition-colors"
            >
                <ArrowLeftIcon className="h-4 w-4" />
                <span>Back to Influencers</span>
            </Link>

            {/* Profile Header */}
            <div className="card p-8">
                <div className="flex flex-col md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-8">
                    <img
                        src={influencer.avatar}
                        alt={influencer.name}
                        className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                    />

                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                            <h1 className="text-3xl font-bold text-secondary-900">
                                {influencer.name}
                            </h1>
                            {influencer.verified && (
                                <CheckBadgeIcon className="h-8 w-8 text-primary-600" />
                            )}
                        </div>

                        <p className="text-xl text-primary-600 font-medium mb-4">
                            {influencer.category}
                        </p>

                        <div className="flex items-center justify-center md:justify-start space-x-6 mb-6">
                            <div className="flex items-center space-x-2">
                                <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                                <span className="font-semibold">{influencer.rating}</span>
                                <span className="text-secondary-600">rating</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <UserGroupIcon className="h-5 w-5 text-secondary-600" />
                                <span className="font-semibold">{influencer.followers.toLocaleString()}</span>
                                <span className="text-secondary-600">followers</span>
                            </div>
                        </div>

                        <p className="text-secondary-700 leading-relaxed mb-6">
                            {influencer.bio}
                        </p>

                        {/* Social Links */}
                        {socialPlatforms.length > 0 && (
                            <div className="flex items-center justify-center md:justify-start space-x-4">
                                <span className="text-sm font-medium text-secondary-600">Follow:</span>
                                {socialPlatforms.map(([platform, handle]) => (
                                    <a
                                        key={platform}
                                        href={`#`}
                                        className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                                    >
                                        {platform}: {handle}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="text-center md:text-right">
                        <div className="mb-4">
                            <span className="text-4xl font-bold text-secondary-900">
                                ${influencer.hourlyRate}
                            </span>
                            <span className="text-secondary-600">/hour</span>
                        </div>
                        <button
                            onClick={() => setIsBookingModalOpen(true)}
                            className="btn-primary w-full md:w-auto px-8 py-3 text-lg"
                        >
                            <VideoCameraIcon className="h-5 w-5 inline mr-2" />
                            Book Video Call
                        </button>
                    </div>
                </div>
            </div>

            {/* Availability */}
            <div className="card p-6">
                <h2 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center">
                    <CalendarIcon className="h-6 w-6 mr-2" />
                    Availability
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {influencer.availability.map((slot) => {
                        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                        return (
                            <div key={slot.id} className="bg-secondary-50 p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-secondary-900">
                                            {days[slot.dayOfWeek]}
                                        </h3>
                                        <div className="flex items-center space-x-2 text-secondary-600">
                                            <ClockIcon className="h-4 w-4" />
                                            <span>{slot.startTime} - {slot.endTime}</span>
                                        </div>
                                        <p className="text-sm text-secondary-500 mt-1">
                                            {slot.timezone}
                                        </p>
                                    </div>
                                    <div className="text-green-600 font-medium">
                                        Available
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {influencer.availability.length === 0 && (
                    <div className="text-center py-8 text-secondary-600">
                        <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-secondary-400" />
                        <p>No availability slots set. Contact the influencer directly.</p>
                    </div>
                )}
            </div>

            {/* What You'll Get */}
            <div className="card p-6">
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                    What You'll Get
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <VideoCameraIcon className="h-6 w-6 text-primary-600 mt-1" />
                            <div>
                                <h3 className="font-semibold text-secondary-900">HD Video Call</h3>
                                <p className="text-secondary-600">High-quality video conversation with screen sharing capabilities</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <ClockIcon className="h-6 w-6 text-primary-600 mt-1" />
                            <div>
                                <h3 className="font-semibold text-secondary-900">Flexible Duration</h3>
                                <p className="text-secondary-600">Choose from 30, 60, or 90-minute sessions based on your needs</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <StarIcon className="h-6 w-6 text-primary-600 mt-1" />
                            <div>
                                <h3 className="font-semibold text-secondary-900">Personalized Advice</h3>
                                <p className="text-secondary-600">Get tailored insights and recommendations for your specific situation</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <CheckBadgeIcon className="h-6 w-6 text-primary-600 mt-1" />
                            <div>
                                <h3 className="font-semibold text-secondary-900">Recording Available</h3>
                                <p className="text-secondary-600">Optional session recording for future reference (with consent)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="card p-6">
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                    Reviews & Testimonials
                </h2>

                <div className="space-y-6">
                    {/* Sample Reviews */}
                    <div className="border-b border-secondary-200 pb-6">
                        <div className="flex items-start space-x-4">
                            <img
                                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face"
                                alt="Reviewer"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                    <h4 className="font-semibold text-secondary-900">Sarah M.</h4>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-secondary-700">
                                    "Amazing session! {influencer.name} provided incredible insights and actionable advice.
                                    The call was well-structured and I left feeling inspired and motivated."
                                </p>
                                <p className="text-sm text-secondary-500 mt-2">2 weeks ago</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-secondary-200 pb-6">
                        <div className="flex items-start space-x-4">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
                                alt="Reviewer"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                    <h4 className="font-semibold text-secondary-900">Mike R.</h4>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-secondary-700">
                                    "Highly recommend! Professional, knowledgeable, and genuinely cared about helping me
                                    achieve my goals. Worth every penny."
                                </p>
                                <p className="text-sm text-secondary-500 mt-2">1 month ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                influencer={influencer}
            />
        </div>
    );
};

export default InfluencerProfile; 