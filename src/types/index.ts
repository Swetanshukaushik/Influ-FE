export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'user' | 'influencer';
    createdAt: Date;
}

export interface Influencer extends User {
    role: 'influencer';
    bio: string;
    category: string;
    followers: number;
    rating: number;
    hourlyRate: number;
    availability: AvailabilitySlot[];
    socialLinks: {
        instagram?: string;
        youtube?: string;
        tiktok?: string;
        twitter?: string;
    };
    verified: boolean;
}

export interface AvailabilitySlot {
    id: string;
    dayOfWeek: number; // 0-6 (Sunday-Saturday)
    startTime: string; // HH:MM format
    endTime: string; // HH:MM format
    timezone: string;
}

export interface VideoCall {
    id: string;
    userId: string;
    influencerId: string;
    scheduledAt: Date;
    duration: number; // in minutes
    status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
    amount: number;
    paymentStatus: 'pending' | 'paid' | 'refunded';
    roomId?: string;
    recordingUrl?: string;
    createdAt: Date;
}

export interface Payment {
    id: string;
    callId: string;
    amount: number;
    currency: string;
    status: 'pending' | 'succeeded' | 'failed' | 'refunded';
    stripePaymentIntentId?: string;
    createdAt: Date;
}

export interface FeedPost {
    id: string;
    influencerId: string;
    influencer: Influencer;
    type: 'video' | 'image' | 'text';
    content: string;
    mediaUrl?: string;
    likes: number;
    comments: Comment[];
    createdAt: Date;
}

export interface Comment {
    id: string;
    userId: string;
    user: User;
    content: string;
    createdAt: Date;
}

export interface BookingRequest {
    influencerId: string;
    date: Date;
    duration: number;
    message?: string;
} 