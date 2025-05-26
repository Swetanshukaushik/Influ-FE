import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FunnelIcon,
    StarIcon,
    CheckBadgeIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';
import { mockInfluencers } from '../data/mockData';

const Influencers: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');

    const categories = ['All', 'Lifestyle', 'Business', 'Tech', 'Fitness', 'Fashion', 'Food', 'Travel'];
    const priceRanges = ['All', '$0-50', '$51-100', '$101-200', '$200+'];

    const filteredInfluencers = mockInfluencers.filter(influencer => {
        const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            influencer.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || selectedCategory === 'All' || influencer.category === selectedCategory;
        const matchesPrice = !priceRange || priceRange === 'All' || (() => {
            const rate = influencer.hourlyRate;
            switch (priceRange) {
                case '$0-50': return rate <= 50;
                case '$51-100': return rate > 50 && rate <= 100;
                case '$101-200': return rate > 100 && rate <= 200;
                case '$200+': return rate > 200;
                default: return true;
            }
        })();

        return matchesSearch && matchesCategory && matchesPrice;
    });

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Discover Influencers
                </h1>
                <p className="text-lg text-gray-600">
                    Connect with verified creators and experts in your field of interest
                </p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                    <FunnelIcon className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Search
                        </label>
                        <input
                            type="text"
                            placeholder="Search by name or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="input-field"
                        >
                            {categories.map(category => (
                                <option key={category} value={category === 'All' ? '' : category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Price Range */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price Range
                        </label>
                        <select
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="input-field"
                        >
                            {priceRanges.map(range => (
                                <option key={range} value={range === 'All' ? '' : range}>
                                    {range}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="flex items-center justify-between">
                <div className="text-gray-600">
                    {filteredInfluencers.length} influencer{filteredInfluencers.length !== 1 ? 's' : ''} found
                </div>
            </div>

            {/* Influencers Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInfluencers.length > 0 ? (
                    filteredInfluencers.map((influencer) => (
                        <div key={influencer.id} className="card p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start space-x-4">
                                <img
                                    src={influencer.avatar}
                                    alt={influencer.name}
                                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2">
                                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                                            {influencer.name}
                                        </h3>
                                        {influencer.verified && (
                                            <CheckBadgeIcon className="h-5 w-5 text-blue-600" />
                                        )}
                                    </div>
                                    <p className="text-blue-600 font-medium text-sm mb-2">
                                        {influencer.category}
                                    </p>
                                    <div className="flex items-center space-x-1 mb-2">
                                        <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="text-sm font-medium">{influencer.rating}</span>
                                        <span className="text-gray-400">•</span>
                                        <span className="text-sm text-gray-600">
                                            <UserGroupIcon className="h-4 w-4 inline mr-1" />
                                            {influencer.followers.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {influencer.bio}
                            </p>

                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-2xl font-bold text-gray-900">
                                        ${influencer.hourlyRate}
                                    </span>
                                    <span className="text-gray-600">/hr</span>
                                </div>
                                <Link
                                    to={`/influencers/${influencer.id}`}
                                    className="btn-primary"
                                >
                                    View Profile
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <UserGroupIcon className="h-16 w-16 mx-auto" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            No influencers found
                        </h3>
                        <p className="text-gray-600">
                            Try adjusting your search criteria or browse all influencers.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Influencers; 