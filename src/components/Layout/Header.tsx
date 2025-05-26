import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    MagnifyingGlassIcon,
    BellIcon,
    UserCircleIcon,
    VideoCameraIcon
} from '@heroicons/react/24/outline';
import { currentUser } from '../../data/mockData';

const Header: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <VideoCameraIcon className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">InfluConnect</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/')
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/influencers"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/influencers')
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Influencers
                        </Link>
                        <Link
                            to="/feed"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/feed')
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Feed
                        </Link>
                        <Link
                            to="/my-calls"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/my-calls')
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            My Calls
                        </Link>
                    </nav>

                    {/* Search and User Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <div className="relative">
                            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search influencers..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <BellIcon className="h-6 w-6" />
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* User Profile */}
                        <div className="flex items-center space-x-3">
                            <img
                                src={currentUser.avatar}
                                alt={currentUser.name}
                                className="h-8 w-8 rounded-full object-cover"
                            />
                            <Link
                                to="/profile"
                                className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                            >
                                {currentUser.name}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header; 