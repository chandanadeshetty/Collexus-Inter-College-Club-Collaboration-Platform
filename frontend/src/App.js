import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ClubList from './components/clubs/ClubList';
import ClubDetail from './components/clubs/ClubDetail';
import CreateClub from './components/clubs/CreateClub';
import EventList from './components/events/EventList';
import CreateEvent from './components/events/CreateEvent';
import ChatWindow from './components/messaging/ChatWindow';
import Search from './pages/Search';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import api from './services/api';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/clubs" element={<ClubList />} />
              <Route path="/clubs/:id" element={<ClubDetail />} />
              <Route path="/create-club" element={<ProtectedRoute><CreateClub /></ProtectedRoute>} />
              <Route path="/events" element={<EventList />} />
              <Route path="/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><ChatWindow /></ProtectedRoute>} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" />;
}

export default App;