import React from 'react';

const Contact = () => (
  <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
    {/* Left: Contact Form */}
    <div className="bg-white rounded-2xl shadow-xl p-10 animate-fadeInUp">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Contact Us</h1>
      <form className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
          <input type="text" placeholder="Name" className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition" />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Your Email</label>
          <input type="email" placeholder="Email" className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition" />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Your Message</label>
          <textarea placeholder="Message" rows={4} className="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black resize-none transition" />
        </div>
        <button type="submit" className="w-full py-3 bg-black text-white font-bold rounded-full transition hover:bg-gray-900">Send Message</button>
      </form>
    </div>
    {/* Right: Info & Map */}
    <div className="flex flex-col items-center md:items-start animate-fadeInUp">
      <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
      <div className="flex items-center gap-3 mb-4">
        <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8z" /></svg>
        <span className="text-gray-700 font-semibold">info@luxe.com</span>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 10a9 9 0 0 1 18 0c0 7-9 13-9 13S3 17 3 10z" /><circle cx="12" cy="10" r="3" /></svg>
        <span className="text-gray-700 font-semibold">123 Fashion Ave, New York, NY 10001</span>
      </div>
      <div className="flex items-center gap-3 mb-8">
        <svg className="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M2 8.5A6.5 6.5 0 0 1 8.5 2h7A6.5 6.5 0 0 1 22 8.5v7A6.5 6.5 0 0 1 15.5 22h-7A6.5 6.5 0 0 1 2 15.5v-7z" /><path d="M15 9h.01" /><path d="M9 15h.01" /></svg>
        <span className="text-gray-700 font-semibold">+1 234 567 890</span>
      </div>
      <iframe
        title="Luxe Location"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-74.00597%2C40.71278%2C-74.00597%2C40.71278&amp;layer=mapnik"
        className="w-full h-56 rounded-xl border border-gray-200 mb-6"
        style={{ minHeight: '200px' }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
      <div className="flex gap-6 mt-2">
        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-500 transition">
          <svg className="w-6 h-6 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition">
          <svg className="w-6 h-6 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4 1.64a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.67 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.64A4.48 4.48 0 0 1 .96 6v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.72 2.16 2.97 4.07 3A9.05 9.05 0 0 1 0 19.54a12.8 12.8 0 0 0 6.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 24 4.59z"/></svg>
        </a>
      </div>
    </div>
  </div>
);

export default Contact; 