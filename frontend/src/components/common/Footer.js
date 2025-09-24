import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Collexus</h3>
            <p>Connecting NIT and IIT students across India for collaboration and networking.</p>
          </div>

          <div className="footer-section">
            <h3>Features</h3>
            <ul>
              <li><a href="/clubs">Browse Clubs</a></li>
              <li><a href="/events">Upcoming Events</a></li>
              <li><a href="/search">Find Students</a></li>
              <li><a href="/register">Join Platform</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><a href="/help">Help Center</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Connect</h3>
            <ul>
              <li><a href="#twitter">Twitter</a></li>
              <li><a href="#linkedin">LinkedIn</a></li>
              <li><a href="#instagram">Instagram</a></li>
              <li><a href="#github">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Collexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;