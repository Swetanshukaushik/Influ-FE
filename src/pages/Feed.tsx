import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    HeartIcon,
    ChatBubbleOvalLeftIcon,
    ShareIcon,
    PlayIcon,
    CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { mockFeedPosts } from '../data/mockData';
import { formatDistanceToNow } from 'date-fns';

const Feed: React.FC = () => {
    const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
    const [showComments, setShowComments] = useState<Set<string>>(new Set());

    const toggleLike = (postId: string) => {
        const newLikedPosts = new Set(likedPosts);
        if (newLikedPosts.has(postId)) {
            newLikedPosts.delete(postId);
        } else {
            newLikedPosts.add(postId);
        }
        setLikedPosts(newLikedPosts);
    };

    const toggleComments = (postId: string) => {
        const newShowComments = new Set(showComments);
        if (newShowComments.has(postId)) {
            newShowComments.delete(postId);
        } else {
            newShowComments.add(postId);
        }
        setShowComments(newShowComments);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-secondary-900 mb-4">
                    Influencer Feed
                </h1>
                <p className="text-lg text-secondary-600">
                    Stay updated with your favorite creators
                </p>
            </div>

            {/* Posts */}
            {mockFeedPosts.map((post) => (
                <div key={post.id} className="card overflow-hidden">
                    {/* Post Header */}
                    <div className="p-4 flex items-center space-x-3">
                        <Link to={`/influencers/${post.influencer.id}`}>
                            <img
                                src={post.influencer.avatar}
                                alt={post.influencer.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        </Link>
                        <div className="flex-1">
                            <div className="flex items-center space-x-2">
                                <Link
                                    to={`/influencers/${post.influencer.id}`}
                                    className="font-semibold text-secondary-900 hover:text-primary-600 transition-colors"
                                >
                                    {post.influencer.name}
                                </Link>
                                {post.influencer.verified && (
                                    <CheckBadgeIcon className="h-4 w-4 text-primary-600" />
                                )}
                            </div>
                            <p className="text-sm text-secondary-600">
                                {post.influencer.category} • {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                            </p>
                        </div>
                        <button className="text-secondary-400 hover:text-secondary-600 transition-colors">
                            <ShareIcon className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Post Content */}
                    <div className="px-4 pb-3">
                        <p className="text-secondary-900 leading-relaxed">
                            {post.content}
                        </p>
                    </div>

                    {/* Post Media */}
                    {post.mediaUrl && (
                        <div className="relative">
                            <img
                                src={post.mediaUrl}
                                alt="Post content"
                                className="w-full h-80 object-cover"
                            />
                            {post.type === 'video' && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button className="bg-black/50 hover:bg-black/70 text-white rounded-full p-4 transition-colors">
                                        <PlayIcon className="h-8 w-8" />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Post Actions */}
                    <div className="p-4 border-t border-secondary-100">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-6">
                                <button
                                    onClick={() => toggleLike(post.id)}
                                    className="flex items-center space-x-2 text-secondary-600 hover:text-red-500 transition-colors"
                                >
                                    {likedPosts.has(post.id) ? (
                                        <HeartSolidIcon className="h-6 w-6 text-red-500" />
                                    ) : (
                                        <HeartIcon className="h-6 w-6" />
                                    )}
                                    <span className="font-medium">
                                        {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                                    </span>
                                </button>

                                <button
                                    onClick={() => toggleComments(post.id)}
                                    className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors"
                                >
                                    <ChatBubbleOvalLeftIcon className="h-6 w-6" />
                                    <span className="font-medium">{post.comments.length}</span>
                                </button>
                            </div>

                            <Link
                                to={`/influencers/${post.influencer.id}`}
                                className="btn-primary text-sm px-4 py-2"
                            >
                                Book Call
                            </Link>
                        </div>

                        {/* Comments Section */}
                        {showComments.has(post.id) && (
                            <div className="space-y-4 pt-4 border-t border-secondary-100">
                                {/* Add Comment */}
                                <div className="flex space-x-3">
                                    <img
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                                        alt="Your avatar"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Add a comment..."
                                            className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>
                                </div>

                                {/* Existing Comments */}
                                {post.comments.map((comment) => (
                                    <div key={comment.id} className="flex space-x-3">
                                        <img
                                            src={comment.user.avatar}
                                            alt={comment.user.name}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="bg-secondary-50 rounded-lg px-3 py-2">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="font-semibold text-sm text-secondary-900">
                                                        {comment.user.name}
                                                    </span>
                                                    <span className="text-xs text-secondary-500">
                                                        {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                                                    </span>
                                                </div>
                                                <p className="text-secondary-700 text-sm">
                                                    {comment.content}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {/* Load More */}
            <div className="text-center py-8">
                <button className="btn-secondary px-6 py-3">
                    Load More Posts
                </button>
            </div>
        </div>
    );
};

export default Feed; 