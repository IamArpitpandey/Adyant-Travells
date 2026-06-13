import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-royal-gradient text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden shadow-xl shadow-black/20">
          <div className="bg-gold-gradient px-6 py-10 md:px-12 md:py-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="max-w-xl">
                <p className="text-sm uppercase tracking-[0.35em] text-royal/80 mb-3">
                  Start your next celebration
                </p>
                <h2 className="text-3xl sm:text-4xl font-semibold text-royal">
                  Ready to begin your journey with Adyant?
                </h2>
                <p className="mt-3 text-white/85 text-sm sm:text-base max-w-2xl leading-relaxed">
                  From elegant weddings to luxury travel planning, our team delivers seamless experiences that last a lifetime.
                </p>
              </div>

              <Link
                to="/booking"
                className="inline-flex items-center justify-center rounded-full bg-royal-DEFAULT px-8 py-3 text-sm font-semibold text-gold-DEFAULT shadow-lg shadow-royal-900/20 transition duration-300 hover:bg-royal-purple hover:text-white hover:-translate-y-0.5"
              >
                Book a consultation
              </Link>
            </div>
          </div>

          <div className="grid gap-10 px-6 py-12 lg:grid-cols-3 lg:px-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-royal font-display text-2xl font-bold shadow-inner shadow-gold-900/20">
                  A
                </div>
                <div>
                  <p className="text-xl font-semibold">Adyant Travells & Weddings</p>
                  <p className="text-sm text-white/70">Luxury travel and wedding planning with a personal touch.</p>
                </div>
              </div>

              <p className="text-white/70 leading-relaxed text-sm">
                Designing memorable journeys and unforgettable wedding celebrations across India since 2015.
              </p>

              <div className="flex items-center gap-3">
                {[
                  { Icon: FiFacebook, label: 'Facebook' },
                  { Icon: FiInstagram, label: 'Instagram' },
                  { Icon: FiTwitter, label: 'Twitter' },
                  { Icon: FiYoutube, label: 'YouTube' },
                ].map(({ Icon, label }, index) => (
                  <a
                    key={index}
                    href="#"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-gold-DEFAULT hover:text-royal"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-1">
              <div>
                <h3 className="text-xs uppercase tracking-[0.35em] text-white/60 mb-4">Services</h3>
                <nav aria-label="Footer services" className="space-y-3">
                  {[
                    'Flight Booking',
                    'Hotel Booking',
                    'Tour Packages',
                    'Wedding Planning',
                    'Venue Booking',
                    'Decoration',
                    'Catering',
                    'Photography',
                  ].map((service) => (
                    <Link
                      key={service}
                      to="/booking"
                      className="flex items-center gap-2 text-sm text-white/70 transition hover:text-gold-DEFAULT"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-DEFAULT" />
                      {service}
                    </Link>
                  ))}
                </nav>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.35em] text-white/60 mb-4">Quick links</h3>
                <nav aria-label="Footer quick links" className="space-y-3">
                  {[
                    { label: 'Home', to: '/' },
                    { label: 'About Us', to: '/about' },
                    { label: 'Travel Packages', to: '/travel' },
                    { label: 'Wedding Services', to: '/wedding' },
                    { label: 'Book Now', to: '/booking' },
                    { label: 'Contact', to: '/contact' },
                  ].map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center gap-2 text-sm text-white/70 transition hover:text-gold-DEFAULT"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-DEFAULT" />
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-[0.35em] text-white/60 mb-4">Contact</h3>
                <address className="not-italic space-y-4 text-sm text-white/70">
                  <div className="flex items-start gap-3">
                    <FiMapPin className="mt-1 text-gold-DEFAULT" size={18} />
                    <span>123 Wedding Palace Road, Unnao, Uttar Pradesh 209801, India</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiPhone className="text-gold-DEFAULT" size={18} />
                    <a href="tel:+919876543210" className="hover:text-gold-DEFAULT transition">+91 98765 43210</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiMail className="text-gold-DEFAULT" size={18} />
                    <a href="mailto:info@adyanttravells.com" className="hover:text-gold-DEFAULT transition">info@adyanttravells.com</a>
                  </div>
                </address>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs uppercase tracking-[0.35em] text-white/60 mb-3">Newsletter</div>
                <p className="text-sm text-white/70 mb-4">
                  Receive travel inspiration, planning tips and wedding offers straight to your inbox.
                </p>
                <form className="flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="footer-newsletter" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-newsletter"
                    type="email"
                    placeholder="Your email"
                    className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-gold-DEFAULT focus:ring-2 focus:ring-gold-DEFAULT/30"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-gold-DEFAULT px-6 py-3 text-sm font-semibold text-royal transition hover:bg-gold-light"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/60 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Adyant Travells & Marriage Planner. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((item, index) => (
              <a key={index} href="#" className="transition hover:text-gold-DEFAULT">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
