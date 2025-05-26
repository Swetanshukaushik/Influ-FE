import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Influencers from './pages/Influencers';
import InfluencerProfile from './pages/InfluencerProfile';
import Feed from './pages/Feed';
import MyCalls from './pages/MyCalls';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/influencers" element={<Influencers />} />
            <Route path="/influencers/:id" element={<InfluencerProfile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/my-calls" element={<MyCalls />} />
            <Route path="/profile" element={<div className="text-center py-12"><h2 className="text-2xl font-bold">Profile Page - Coming Soon</h2></div>} />
          </Routes>
        </Layout>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
