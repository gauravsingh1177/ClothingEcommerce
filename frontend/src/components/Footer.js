import React from 'react';

const Footer = () => (
  <footer style={{ background: '#222', color: '#fff', padding: '2rem 0', marginTop: 40 }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
      <div style={{ fontWeight: 700, fontSize: 22 }}>TrendyWear</div>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <a href="#about" style={{ color: '#fff', textDecoration: 'none' }}>About</a>
        <a href="#contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a>
        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>Instagram</a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>Twitter</a>
      </div>
      <div style={{ fontSize: 14, color: '#bbb' }}>© {new Date().getFullYear()} TrendyWear. All rights reserved.</div>
    </div>
  </footer>
);

export default Footer; 