import React from 'react';
import { Link } from 'react-router-dom';
import { FiAward, FiHeart, FiUsers, FiGlobe } from 'react-icons/fi';

const AboutPage = () => {
  const team = [
    { name: 'Adyant Kumar', role: 'Founder & CEO', desc: 'With 15+ years in luxury travel and wedding planning, Adyant built this company on a vision of perfection.', avatar: 'AK', color: '#C9A84C' },
    { name: 'Priya Sharma', role: 'Head of Wedding Planning', desc: 'An award-winning wedding planner who has orchestrated 400+ dream weddings across India and abroad.', avatar: 'PS', color: '#E74C8B' },
    { name: 'Rohan Verma', role: 'Travel Director', desc: '12 years of expertise in crafting immersive travel experiences across 50+ countries worldwide.', avatar: 'RV', color: '#27AE8F' },
    { name: 'Neha Gupta', role: 'Customer Relations', desc: 'Ensures every client feels like royalty — from the first inquiry to the last goodbye.', avatar: 'NG', color: '#9B59B6' },
    { name: 'Arjun Singh', role: 'Lead Decorator', desc: 'Transforms spaces into breathtaking masterpieces with his signature artistic touch and creativity.', avatar: 'AS', color: '#E67E22' },
    { name: 'Kavita Patel', role: 'Finance & Operations', desc: 'Keeps everything running smoothly, ensuring value for money and transparent pricing always.', avatar: 'KP', color: '#3498DB' },
  ];

  const milestones = [
    { year: '2015', title: 'Foundation', desc: 'Adyant Travells was born with a simple mission: make travel and weddings extraordinary.' },
    { year: '2017', title: 'Wedding Division', desc: 'Launched our dedicated wedding planning arm, quickly becoming the region\'s top planner.' },
    { year: '2019', title: 'International Expansion', desc: 'Expanded to international destinations — Bali, Dubai, Europe, and Southeast Asia.' },
    { year: '2021', title: '500 Weddings', desc: 'Celebrated our 500th wedding — a grand destination ceremony in Udaipur.' },
    { year: '2023', title: 'Award Recognition', desc: 'Awarded "Best Wedding Planner — North India" and "Top Travel Agency" by Tourism Board.' },
    { year: '2024', title: 'Digital Platform', desc: 'Launched our digital booking platform to serve clients across India seamlessly.' },
  ];

  const values = [
    { icon: <FiAward size={28} />, title: 'Excellence', desc: 'We set the highest standards in every service we deliver, never settling for less than perfection.', color: '#C9A84C' },
    { icon: <FiHeart size={28} />, title: 'Passion', desc: 'We genuinely care about making your moments magical — it\'s not just a job, it\'s our calling.', color: '#E74C8B' },
    { icon: <FiUsers size={28} />, title: 'Personal Touch', desc: 'Every client is unique. We listen, understand, and craft experiences tailored just for you.', color: '#27AE8F' },
    { icon: <FiGlobe size={28} />, title: 'Global Reach', desc: 'With partners across 50+ countries, we make the world accessible and extraordinary for you.', color: '#9B59B6' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-cream dark:bg-royal-DEFAULT">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-royal-DEFAULT/80" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <div className="section-tag !text-gold-light mb-3">Our Story</div>
          <h1 className="font-display text-4xl md:text-6xl text-white font-semibold mb-4">About Adyant Travells</h1>
          <p className="text-white/70 text-lg max-w-2xl">9 years of crafting unforgettable journeys and perfect celebrations</p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-tag mb-3">Our Story</div>
            <h2 className="section-title mb-6">Where Every Journey Becomes a Memory</h2>
            <div className="space-y-4 text-text-medium dark:text-white/60 leading-relaxed">
              <p>Founded in 2015 by Adyant Kumar, we started with a simple yet powerful belief: every person deserves to experience the world beautifully and celebrate life's milestones with absolute perfection.</p>
              <p>What began as a small travel consultancy in Lucknow has grown into one of North India's most trusted names in both luxury travel and wedding planning — serving thousands of happy clients across India and beyond.</p>
              <p>We bridge the gap between dream and reality. Whether it's a solo adventure, a family holiday, a honeymoon in the Maldives, or the most important day of your life — we handle every detail with care, creativity, and commitment.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80" alt="Wedding" className="rounded-2xl h-64 w-full object-cover" />
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" alt="Travel" className="rounded-2xl h-64 w-full object-cover mt-8" />
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-royal-gradient py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white/10 rounded-2xl p-8 border border-white/10">
              <div className="w-14 h-14 rounded-xl bg-gold-DEFAULT/20 flex items-center justify-center mb-4 text-gold-DEFAULT text-2xl">🎯</div>
              <h3 className="font-display text-3xl text-white font-semibold mb-4">Our Mission</h3>
              <p className="text-white/60 leading-relaxed">To deliver extraordinary travel and wedding experiences that exceed every expectation — combining impeccable service, creative excellence, and genuine care for our clients' happiness at every step of their journey with us.</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 border border-white/10">
              <div className="w-14 h-14 rounded-xl bg-gold-DEFAULT/20 flex items-center justify-center mb-4 text-gold-DEFAULT text-2xl">🌟</div>
              <h3 className="font-display text-3xl text-white font-semibold mb-4">Our Vision</h3>
              <p className="text-white/60 leading-relaxed">To become India's most beloved travel and wedding planning company — recognized not just for stunning experiences, but for the relationships we build, the trust we earn, and the smiles we create for thousands of families across generations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="section-tag mb-3">What Drives Us</div>
          <h2 className="section-title">Our Core Values</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="card-elegant p-6 text-center group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: v.color + '15', color: v.color }}>
                {v.icon}
              </div>
              <h3 className="font-display text-2xl font-semibold text-text-dark dark:text-white mb-2">{v.title}</h3>
              <p className="text-text-medium dark:text-white/60 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gold-gradient py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '5000+', label: 'Happy Travelers', icon: '✈️' },
              { num: '800+', label: 'Weddings Planned', icon: '💍' },
              { num: '50+', label: 'Destinations', icon: '🌍' },
              { num: '9+', label: 'Years Experience', icon: '🏆' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl mb-1">{s.icon}</div>
                <div className="font-display text-3xl md:text-4xl font-bold text-royal">{s.num}</div>
                <div className="text-royal/70 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Journey / Timeline */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="section-tag mb-3">Our Journey</div>
          <h2 className="section-title">Milestones That Define Us</h2>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gold-DEFAULT/30 hidden md:block" />
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div key={i} className={`flex gap-8 items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="flex-1 hidden md:block" />
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center font-display font-bold text-royal text-sm">
                    {m.year.slice(2)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="card-elegant p-5">
                    <div className="text-gold-DEFAULT text-xs font-semibold mb-1">{m.year}</div>
                    <h3 className="font-display text-xl font-semibold text-text-dark dark:text-white mb-1">{m.title}</h3>
                    <p className="text-text-medium dark:text-white/60 text-sm">{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-cream dark:bg-royal-purple/20 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="section-tag mb-3">The People</div>
            <h2 className="section-title">Meet Our Team</h2>
            <p className="text-text-medium dark:text-white/60 mt-4">The passionate professionals behind every perfect experience</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div key={i} className="card-elegant p-6 text-center group">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 group-hover:scale-105 transition-transform" style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}99)` }}>
                  {member.avatar}
                </div>
                <h3 className="font-display text-xl font-semibold text-text-dark dark:text-white mb-1">{member.name}</h3>
                <div className="text-gold-DEFAULT text-sm font-medium mb-3">{member.role}</div>
                <p className="text-text-medium dark:text-white/60 text-sm leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h3 className="font-display text-4xl font-semibold text-text-dark dark:text-white mb-4">Ready to Create Your Story With Us?</h3>
        <p className="text-text-medium dark:text-white/60 mb-8 max-w-xl mx-auto">Whether you're planning a trip or a wedding, we're here to make it unforgettable.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/booking" className="btn-gold text-base px-8 py-3">Book a Consultation</Link>
          <Link to="/contact" className="btn-outline-gold text-base px-8 py-3">Get in Touch</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
