import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function ClubList() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    college: '',
    search: ''
  });

  const categories = [
    'Technology', 'Arts & Literature', 'Business', 'Sports', 
    'Music', 'Photography', 'Social Service', 'Research', 
    'Cultural', 'Academic'
  ];

  const colleges = [
    'IIT Delhi', 'IIT Bombay', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur',
    'NIT Trichy', 'NIT Warangal', 'NIT Surathkal', 'NIT Calicut', 'NIT Rourkela'
  ];

  useEffect(() => {
    fetchClubs();
  }, [filters]);

  const fetchClubs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.college) params.append('college', filters.college);
      if (filters.search) params.append('search', filters.search);

      const response = await api.get(`/clubs?${params.toString()}`);
      setClubs(response.data.clubs);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>
          Student Clubs
        </h1>
        <Link to="/create-club" className="btn btn-primary">
          Create Club
        </Link>
      </div>

      {/* Filters */}
      <div className="card mb-20">
        <div className="grid grid-3" style={{ gap: '15px' }}>
          <div className="form-group">
            <label className="form-label">Search Clubs</label>
            <input
              type="text"
              className="form-input"
              placeholder="Search by name or description..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">College</label>
            <select
              className="form-select"
              value={filters.college}
              onChange={(e) => handleFilterChange('college', e.target.value)}
            >
              <option value="">All Colleges</option>
              {colleges.map(college => (
                <option key={college} value={college}>{college}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Clubs Grid */}
      {loading ? (
        <div className="text-center" style={{ paddingTop: '50px' }}>
          <div className="loading" style={{ width: '40px', height: '40px' }}></div>
        </div>
      ) : clubs.length > 0 ? (
        <div className="grid grid-3">
          {clubs.map(club => (
            <div key={club._id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#3b82f6' }}>
                  {club.name}
                </h3>
                <span style={{ 
                  background: '#e0f2fe', 
                  color: '#0369a1', 
                  padding: '4px 8px', 
                  borderRadius: '12px', 
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {club.category}
                </span>
              </div>

              <p style={{ color: '#6b7280', marginBottom: '15px', lineHeight: '1.5' }}>
                {club.description}
              </p>

              <div style={{ marginBottom: '15px', fontSize: '14px', color: '#9ca3af' }}>
                <div style={{ marginBottom: '5px' }}>🏛️ {club.college}</div>
                <div>👥 {club.members?.length || 0} members</div>
              </div>

              <Link 
                to={`/clubs/${club._id}`} 
                className="btn btn-outline"
                style={{ width: '100%' }}
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center">
          <h3 style={{ color: '#6b7280', marginBottom: '10px' }}>No clubs found</h3>
          <p style={{ color: '#9ca3af' }}>Try adjusting your search criteria or create a new club!</p>
        </div>
      )}
    </div>
  );
}

export default ClubList;