# InfluConnect - Influencer Video Chat Platform

A modern React-based platform that connects users with influencers through paid video calls. Users can browse influencers, schedule video sessions, and interact through a social feed.

## 🚀 Features

### Core Functionality
- **Influencer Discovery**: Browse and search influencers by category, price, and rating
- **Video Call Booking**: Schedule one-on-one video calls with flexible duration options
- **Payment Integration**: Secure payment processing for bookings
- **Social Feed**: View and interact with influencer posts
- **Call Management**: Track upcoming, completed, and cancelled calls

### User Experience
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Availability**: View influencer availability and book instantly
- **Interactive Booking**: Smart booking modal with date/time selection
- **Profile Management**: Detailed influencer profiles with reviews and social links

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Beautiful interface built with Tailwind CSS
- **Component Architecture**: Reusable and maintainable React components
- **Mock Data**: Comprehensive mock data for testing and development

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Heroicons
- **Date Handling**: date-fns
- **UI Components**: Headless UI
- **Notifications**: React Hot Toast
- **Build Tool**: Vite

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd influ-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Usage Guide

### For Users

1. **Browse Influencers**
   - Visit the "Influencers" page to see all available creators
   - Use filters to find influencers by category, price range, or search terms
   - View detailed profiles with ratings, bio, and availability

2. **Book a Video Call**
   - Click "Book Call" on any influencer profile
   - Select your preferred duration (30, 60, or 90 minutes)
   - Choose an available date and time slot
   - Add an optional message describing what you'd like to discuss
   - Complete the booking with payment

3. **Manage Your Calls**
   - Visit "My Calls" to see all your scheduled and completed sessions
   - Join calls when they're scheduled to start
   - Access recordings and receipts for completed calls

4. **Social Feed**
   - Follow influencer updates on the "Feed" page
   - Like and comment on posts
   - Discover new content and book calls directly from posts

### Key Pages

- **Home**: Landing page with featured influencers and platform overview
- **Influencers**: Browse and filter all available influencers
- **Influencer Profile**: Detailed view with booking functionality
- **Feed**: Social media-style feed of influencer posts
- **My Calls**: Personal dashboard for call management

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Layout/          # Layout components (Header, Layout)
│   └── BookingModal.tsx # Booking functionality
├── pages/               # Main application pages
│   ├── Home.tsx
│   ├── Influencers.tsx
│   ├── InfluencerProfile.tsx
│   ├── Feed.tsx
│   └── MyCalls.tsx
├── types/               # TypeScript type definitions
│   └── index.ts
├── data/                # Mock data for development
│   └── mockData.ts
└── App.tsx             # Main application component
```

## 🎨 Design System

### Colors
- **Primary**: Blue tones for main actions and branding
- **Secondary**: Gray tones for text and backgrounds
- **Accent**: Green for success states, Red for errors

### Components
- **Cards**: Consistent card design for content containers
- **Buttons**: Primary and secondary button styles
- **Forms**: Styled input fields and form elements
- **Navigation**: Clean header with search and user profile

## 🔮 Future Enhancements

### MVP Extensions
- **Real Payment Integration**: Stripe/PayPal integration
- **Video Call Infrastructure**: WebRTC implementation
- **User Authentication**: Login/signup system
- **Real-time Notifications**: Push notifications for bookings
- **Recording Management**: Video storage and sharing

### Advanced Features
- **AI Matching**: Smart influencer recommendations
- **Group Calls**: Multi-user video sessions
- **Content Sharing**: Upload and share call recordings to social platforms
- **Analytics Dashboard**: Insights for both users and influencers
- **Mobile App**: React Native companion app

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Unsplash**: For providing beautiful stock photos
- **Heroicons**: For the comprehensive icon set
- **Tailwind CSS**: For the utility-first CSS framework
- **React Community**: For the amazing ecosystem and tools
