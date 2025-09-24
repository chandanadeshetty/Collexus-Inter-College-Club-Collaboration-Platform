import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

function Dashboard() {
  const { user } = useAuth();
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [clubsRes, eventsRes] = await Promise.all([
        api.get('/clubs?limit=6'),
        api.get('/events?upcoming=true&limit=6')
      ]);

      setClubs(clubsRes.data.clubs);
      setEvents(eventsRes.data.events);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container text-center" style={{ paddingTop: '100px' }}>
        <div className="loading" style={{ width: '40px', height: '40px' }}></div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Welcome Section */}
      <section className="mb-20">
        <div className="card" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)', color: 'white' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>
            Welcome back, {user?.fullName}! 👋
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>
            Ready to connect and collaborate? Here's what's happening in your network.
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-20">
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>Quick Actions</h2>
        <div className="grid grid-4">
          <Link to="/clubs" className="card text-center" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontSize: '32px', marginBottom: '15px' }}>🏛️</div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#3b82f6' }}>Browse Clubs</h3>
            <p>Discover new communities</p>
          </Link>

          <Link to="/create-club" className="card text-center" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontSize: '32px', marginBottom: '15px' }}>➕</div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#3b82f6' }}>Create Club</h3>
            <p>Start your own community</p>
          </Link>

          <Link to="/events" className="card text-center" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontSize: '32px', marginBottom: '15px' }}>📅</div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#3b82f6' }}>View Events</h3>
            <p>Join upcoming events</p>
          </Link>

          <Link to="/messages" className="card text-center" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontSize: '32px', marginBottom: '15px' }}>💬</div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#3b82f6' }}>Messages</h3>
            <p>Chat with connections</p>
          </Link>
        </div>
      </section>

      {/* Recent Clubs */}
      <section className="mb-20">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Popular Clubs</h2>
          <Link to="/clubs" className="btn btn-outline">View All</Link>
        </div>

        {clubs.length > 0 ? (
          <div className="grid grid-3">
            {clubs.map(club => (
              <div key={club._id} className="card">
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#3b82f6', marginBottom: '10px' }}>
                  {club.name}
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '15px' }}>{club.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: '#9ca3af' }}>
                  <span>{club.category}</span>
                  <span>{club.members?.length || 0} members</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center">
            <p style={{ color: '#6b7280' }}>No clubs available. Be the first to create one!</p>
          </div>
        )}
      </section>

      {/* Upcoming Events */}
      <section className="mb-20">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Upcoming Events</h2>
          <Link to="/events" className="btn btn-outline">View All</Link>
        </div>

        {events.length > 0 ? (
          <div className="grid grid-2">
            {events.map(event => (
              <div key={event._id} className="card">
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#3b82f6', marginBottom: '10px' }}>
                  {event.title}
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '15px' }}>{event.description}</p>
                <div style={{ fontSize: '14px', color: '#9ca3af' }}>
                  <div>📅 {new Date(event.date).toLocaleDateString()}</div>
                  <div>📍 {event.venue}</div>
                  <div>👥 {event.attendees?.length || 0} registered</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center">
            <p style={{ color: '#6b7280' }}>No upcoming events. Check back later!</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;