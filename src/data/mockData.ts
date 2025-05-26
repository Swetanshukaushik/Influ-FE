import type { User, Influencer, VideoCall, FeedPost, Comment } from '../types';

export const mockUsers: User[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        role: 'user',
        createdAt: new Date('2024-01-15'),
    },
    {
        id: '2',
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        role: 'user',
        createdAt: new Date('2024-02-10'),
    },
];

export const mockInfluencers: Influencer[] = [
    {
        id: 'inf1',
        name: 'Emma Rodriguez',
        email: 'emma@example.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        role: 'influencer',
        bio: 'Lifestyle and wellness coach with 5+ years of experience. Helping people transform their lives through mindful living and healthy habits.',
        category: 'Lifestyle & Wellness',
        followers: 250000,
        rating: 4.9,
        hourlyRate: 150,
        availability: [
            {
                id: 'av1',
                dayOfWeek: 1, // Monday
                startTime: '09:00',
                endTime: '17:00',
                timezone: 'America/New_York',
            },
            {
                id: 'av2',
                dayOfWeek: 3, // Wednesday
                startTime: '10:00',
                endTime: '16:00',
                timezone: 'America/New_York',
            },
        ],
        socialLinks: {
            instagram: '@emmalifestyle',
            youtube: 'EmmaWellness',
            tiktok: '@emmarodriguez',
        },
        verified: true,
        createdAt: new Date('2023-06-01'),
    },
    {
        id: 'inf2',
        name: 'Alex Chen',
        email: 'alex@example.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        role: 'influencer',
        bio: 'Tech entrepreneur and startup mentor. Sharing insights on building successful businesses and navigating the startup ecosystem.',
        category: 'Business & Tech',
        followers: 180000,
        rating: 4.8,
        hourlyRate: 200,
        availability: [
            {
                id: 'av3',
                dayOfWeek: 2, // Tuesday
                startTime: '14:00',
                endTime: '18:00',
                timezone: 'America/Los_Angeles',
            },
            {
                id: 'av4',
                dayOfWeek: 4, // Thursday
                startTime: '13:00',
                endTime: '17:00',
                timezone: 'America/Los_Angeles',
            },
        ],
        socialLinks: {
            youtube: 'AlexTechTalks',
            twitter: '@alexchen_tech',
        },
        verified: true,
        createdAt: new Date('2023-08-15'),
    },
    {
        id: 'inf3',
        name: 'Maya Patel',
        email: 'maya@example.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        role: 'influencer',
        bio: 'Fitness trainer and nutrition expert. Passionate about helping others achieve their health goals through sustainable lifestyle changes.',
        category: 'Fitness & Health',
        followers: 320000,
        rating: 4.95,
        hourlyRate: 120,
        availability: [
            {
                id: 'av5',
                dayOfWeek: 1, // Monday
                startTime: '06:00',
                endTime: '12:00',
                timezone: 'America/New_York',
            },
            {
                id: 'av6',
                dayOfWeek: 5, // Friday
                startTime: '07:00',
                endTime: '15:00',
                timezone: 'America/New_York',
            },
        ],
        socialLinks: {
            instagram: '@mayafitness',
            youtube: 'MayaFitJourney',
            tiktok: '@mayapatel_fit',
        },
        verified: true,
        createdAt: new Date('2023-04-20'),
    },
];

export const mockComments: Comment[] = [
    {
        id: 'c1',
        userId: '1',
        user: mockUsers[0],
        content: 'This is so inspiring! Thank you for sharing.',
        createdAt: new Date('2024-03-15T10:30:00'),
    },
    {
        id: 'c2',
        userId: '2',
        user: mockUsers[1],
        content: 'Love your content! Keep it up! 💪',
        createdAt: new Date('2024-03-15T11:15:00'),
    },
];

export const mockFeedPosts: FeedPost[] = [
    {
        id: 'post1',
        influencerId: 'inf1',
        influencer: mockInfluencers[0],
        type: 'image',
        content: 'Starting the week with some morning meditation and gratitude practice. What are you grateful for today? 🧘‍♀️✨',
        mediaUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
        likes: 1250,
        comments: [mockComments[0]],
        createdAt: new Date('2024-03-15T08:00:00'),
    },
    {
        id: 'post2',
        influencerId: 'inf2',
        influencer: mockInfluencers[1],
        type: 'video',
        content: 'Just wrapped up an amazing mentoring session! Here are 3 key tips for early-stage startups that I shared today 🚀',
        mediaUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=300&fit=crop',
        likes: 890,
        comments: [mockComments[1]],
        createdAt: new Date('2024-03-14T16:30:00'),
    },
    {
        id: 'post3',
        influencerId: 'inf3',
        influencer: mockInfluencers[2],
        type: 'image',
        content: 'New workout routine dropping tomorrow! This 20-minute HIIT session will get your heart pumping 💪 Who\'s ready to sweat?',
        mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
        likes: 2100,
        comments: mockComments,
        createdAt: new Date('2024-03-13T19:45:00'),
    },
];

export const mockVideoCalls: VideoCall[] = [
    {
        id: 'call1',
        userId: '1',
        influencerId: 'inf1',
        scheduledAt: new Date('2024-03-20T15:00:00'),
        duration: 60,
        status: 'scheduled',
        amount: 150,
        paymentStatus: 'paid',
        createdAt: new Date('2024-03-15T10:00:00'),
    },
    {
        id: 'call2',
        userId: '2',
        influencerId: 'inf2',
        scheduledAt: new Date('2024-03-18T14:00:00'),
        duration: 30,
        status: 'completed',
        amount: 100,
        paymentStatus: 'paid',
        roomId: 'room_123',
        recordingUrl: 'https://example.com/recording/call2',
        createdAt: new Date('2024-03-10T09:00:00'),
    },
];

// Current logged-in user (for demo purposes)
export const currentUser: User = mockUsers[0]; 