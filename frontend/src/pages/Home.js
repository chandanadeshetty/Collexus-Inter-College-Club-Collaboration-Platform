import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#111827', marginBottom: '20px' }}>
          Connect. Collaborate. Create.
        </h1>
        <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
          Join the premier networking platform for NIT and IIT students. Discover clubs, attend events, and build meaningful connections.
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" className="btn btn-primary" style={{ fontSize: '18px', padding: '15px 30px' }}>
            Join Collexus
          </Link>
          <Link to="/clubs" className="btn btn-outline" style={{ fontSize: '18px', padding: '15px 30px' }}>
            Explore Clubs
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-20">
        <h2 className="text-center mb-20" style={{ fontSize: '36px', fontWeight: '600', color: '#111827' }}>
          Why Choose Collexus?
        </h2>
        <div className="grid grid-3">
          <div className="card text-center">
            <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#3b82f6', marginBottom: '15px' }}>
              🏛️ Elite Network
            </h3>
            <p>Connect with students from top NITs and IITs across India. Build your professional network early.</p>
          </div>

          <div className="card text-center">
            <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#3b82f6', marginBottom: '15px' }}>
              🎯 Find Your Tribe
            </h3>
            <p>Discover clubs and communities that match your interests, from tech to arts to entrepreneurship.</p>
          </div>

          <div className="card text-center">
            <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#3b82f6', marginBottom: '15px' }}>
              🚀 Launch Together
            </h3>
            <p>Collaborate on projects, participate in hackathons, and launch startups with like-minded peers.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-20">
        <div className="card" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)', color: 'white' }}>
          <div className="grid grid-3 text-center">
            <div>
              <h3 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>500+</h3>
              <p>Active Students</p>
            </div>
            <div>
              <h3 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>50+</h3>
              <p>Student Clubs</p>
            </div>
            <div>
              <h3 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>100+</h3>
              <p>Events Monthly</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center mb-20">
        <div className="card" style={{ background: '#f8fafc', border: '2px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', color: '#111827', marginBottom: '15px' }}>
            Ready to Get Started?
          </h2>
          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '25px' }}>
            Join thousands of students already networking on Collexus
          </p>
          <Link to="/register" className="btn btn-primary" style={{ fontSize: '18px', padding: '15px 30px' }}>
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;