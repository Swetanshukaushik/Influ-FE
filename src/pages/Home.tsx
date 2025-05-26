import React from 'react';
import { Link } from 'react-router-dom';
import {
    VideoCameraIcon,
    StarIcon,
    UserGroupIcon,
    ClockIcon
} from '@heroicons/react/24/outline';
import { mockInfluencers } from '../data/mockData';

const Home: React.FC = () => {
    const featuredInfluencers = mockInfluencers.slice(0, 3);

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center py-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Connect with Your Favorite
                        <span className="text-blue-600"> Influencers</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        Book one-on-one video calls with top influencers, creators, and experts.
                        Get personalized advice, mentorship, and exclusive content.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link
                            to="/influencers"
                            className="btn-primary text-lg px-8 py-3"
                        >
                            Browse Influencers
                        </Link>
                        <Link
                            to="/feed"
                            className="btn-secondary text-lg px-8 py-3"
                        >
                            Explore Feed
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Why Choose InfluConnect?
                    </h2>
                    <p className="text-lg text-gray-600">
                        The premier platform for meaningful connections with influencers
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <VideoCameraIcon className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            HD Video Calls
                        </h3>
                        <p className="text-gray-600">
                            Crystal clear video quality with recording capabilities for future reference
                        </p>
                    </div>

                    <div className="text-center p-6">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <StarIcon className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Verified Influencers
                        </h3>
                        <p className="text-gray-600">
                            All influencers are verified and rated by our community for quality assurance
                        </p>
                    </div>

                    <div className="text-center p-6">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ClockIcon className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Flexible Scheduling
                        </h3>
                        <p className="text-gray-600">
                            Book calls at your convenience with real-time availability updates
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Influencers */}
            <section className="py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Featured Influencers
                    </h2>
                    <p className="text-lg text-gray-600">
                        Connect with top-rated creators and experts
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {featuredInfluencers.map((influencer) => (
                        <div key={influencer.id} className="card p-6 hover:shadow-lg transition-shadow">
                            <div className="text-center">
                                <img
                                    src={influencer.avatar}
                                    alt={influencer.name}
                                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {influencer.name}
                                </h3>
                                <p className="text-blue-600 font-medium mb-2">
                                    {influencer.category}
                                </p>
                                <div className="flex items-center justify-center space-x-2 mb-3">
                                    <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span className="text-sm text-gray-600">
                                        {influencer.rating} ({influencer.followers.toLocaleString()} followers)
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {influencer.bio}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-semibold text-gray-900">
                                        ${influencer.hourlyRate}/hr
                                    </span>
                                    <Link
                                        to={`/influencers/${influencer.id}`}
                                        className="btn-primary text-sm px-4 py-2"
                                    >
                                        Book Call
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <Link
                        to="/influencers"
                        className="btn-secondary px-6 py-3"
                    >
                        View All Influencers
                    </Link>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-blue-600 text-white py-16 rounded-2xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-8">
                        Join Thousands of Happy Users
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="text-4xl font-bold mb-2">10K+</div>
                            <div className="text-blue-100">Video Calls Completed</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">500+</div>
                            <div className="text-blue-100">Verified Influencers</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">4.9</div>
                            <div className="text-blue-100">Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home; 