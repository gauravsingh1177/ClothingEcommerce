import React from 'react';

const team = [
  { name: 'Gaurav Singh', role: 'Founder & CEO', image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Priya Verma', role: 'Head of Design', image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Sara Lee', role: 'Marketing Lead', image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const About = () => (
  <div>
    {/* Hero Banner */}
    <div className="relative h-72 md:h-96 flex items-center justify-center mb-16 overflow-hidden">
      <img src="https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="About Hero" className="absolute inset-0 w-full h-full object-cover object-center scale-105 brightness-75" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center text-white flex flex-col items-center justify-center w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">About Luxe</h1>
        <p className="text-lg md:text-xl font-medium drop-shadow max-w-2xl mx-auto">Empowering self-expression through premium, sustainable, and affordable fashion for all.</p>
      </div>
    </div>

    {/* Value Props with Icons */}
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
      <div className="flex flex-col items-center">
        <svg className="h-10 w-10 mb-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V6m0 12v-2" /></svg>
        <h3 className="font-bold text-lg mb-2">Sustainable Fashion</h3>
        <p className="text-gray-500">Eco-friendly materials and ethical sourcing.</p>
      </div>
      <div className="flex flex-col items-center">
        <svg className="h-10 w-10 mb-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 4v5h5M20 20v-5h-5" /><path d="M4 10a10.95 10.95 0 013.53-8.08l-1.48-1.48A13.93 13.93 0 002 10h2zm16 4a10.95 10.95 0 01-3.53 8.08l1.48 1.48A13.93 13.93 0 0022 14h-2z" /></svg>
        <h3 className="font-bold text-lg mb-2">Customer-First</h3>
        <p className="text-gray-500">Service, returns, and support you can trust.</p>
      </div>
      <div className="flex flex-col items-center">
        <svg className="h-10 w-10 mb-4 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg>
        <h3 className="font-bold text-lg mb-2">Empowerment</h3>
        <p className="text-gray-500">Diversity, inclusion, and creativity for all.</p>
      </div>
    </div>

    {/* Animated Counters */}
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 flex flex-wrap justify-center gap-12 text-center">
      <div className="flex flex-col items-center">
        <span className="text-4xl font-extrabold text-purple-600 animate-pulse">10,000+</span>
        <span className="text-gray-600 mt-2">Happy Customers</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-4xl font-extrabold text-blue-600 animate-pulse">50+</span>
        <span className="text-gray-600 mt-2">Collections</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-4xl font-extrabold text-pink-600 animate-pulse">100%</span>
        <span className="text-gray-600 mt-2">Satisfaction</span>
      </div>
    </div>

    {/* Timeline / Our Story */}
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Story</h2>
      <div className="relative border-l-2 border-gray-200 pl-8">
        <div className="mb-10">
          <div className="absolute -left-4 top-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">2018</div>
          <div className="ml-8">
            <h3 className="font-bold text-lg mb-1">Luxe is Born</h3>
            <p className="text-gray-600">Our journey began with a vision to make premium fashion accessible to all.</p>
          </div>
        </div>
        <div className="mb-10">
          <div className="absolute -left-4 top-24 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2020</div>
          <div className="ml-8 mt-16">
            <h3 className="font-bold text-lg mb-1">Sustainability Milestone</h3>
            <p className="text-gray-600">We launched our first eco-friendly collection and committed to ethical sourcing.</p>
          </div>
        </div>
        <div>
          <div className="absolute -left-4 top-48 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">2023</div>
          <div className="ml-8 mt-16">
            <h3 className="font-bold text-lg mb-1">10,000+ Customers</h3>
            <p className="text-gray-600">We celebrate our growing community and look forward to the future of Luxe.</p>
          </div>
        </div>
      </div>
    </div>

    {/* Team Grid */}
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
      <h2 className="text-2xl font-bold mb-8 text-center">Meet the Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {team.map((member) => (
          <div key={member.name} className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col items-center p-6 border border-gray-100 animate-fadeInUp">
            <img src={member.image} alt={member.name} className="w-32 h-32 object-cover rounded-full mb-4" />
            <div className="font-bold text-lg text-center">{member.name}</div>
            <div className="text-gray-500 text-center">{member.role}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default About; 