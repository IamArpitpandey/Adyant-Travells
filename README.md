# 🌟 Adyant Travells & Marriage Planner

A full-stack premium website for travel booking and wedding planning services — built with React, Node.js, Express, and MongoDB.

---

## ✨ Features

### Frontend (React + Tailwind CSS)
- 🏠 **Home Page** — Hero slider, services overview, featured packages, gallery, testimonials, FAQ
- ✈️ **Travel Page** — Tour packages, hotel booking, flight search with filters
- 💍 **Wedding Page** — Services, pricing packages (Silver/Gold/Platinum), portfolio gallery
- 📋 **Booking Page** — Unified booking form for travel and wedding with backend integration
- 📖 **About Page** — Company story, mission/vision, team, milestones timeline
- 📞 **Contact Page** — Contact form, Google Maps embed, WhatsApp integration
- 🔐 **Auth Pages** — Login & Register with JWT authentication
- 👨‍💼 **Admin Dashboard** — Bookings management (approve/reject), contacts, users

### Backend (Node.js + Express + MongoDB)
- REST API with `/auth`, `/bookings`, `/services`, `/contact`, `/admin` routes
- JWT-based authentication with bcrypt password hashing
- Admin role-based access control
- Booking ID auto-generation
- Mock email notifications (console logging)

### Extra Features
- 🌙 Dark / Light mode toggle
- 📱 Fully responsive (mobile, tablet, desktop)
- 💬 WhatsApp floating chat button
- ⬆️ Scroll-to-top button
- 🔍 SEO meta tags
- ✨ Scroll reveal animations
- 🖼️ Image gallery with modal viewer
- 🎠 Testimonial auto-slider
- ⚡ Loading screen animation

---

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### 1. Extract the ZIP and navigate to project folder

```bash
cd adyant-travells
```

### 2. Setup Environment Variables

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/adyant_travells
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

### 3. Install All Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..

# Install client dependencies
cd client && npm install && cd ..
```

Or use the shortcut:
```bash
npm run install-all
```

### 4. Start the Application

**Development mode (with hot reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

This starts:
- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:3000

---

## 👤 Create Admin Account

After starting the server, run this API call once to seed the admin user:

```bash
curl -X POST http://localhost:5000/api/admin/seed \
  -H "Content-Type: application/json"
```

Or visit: `http://localhost:5000/api/admin/seed` (POST request via Postman)

**Admin Credentials:**
- Email: `admin@adyanttravells.com`
- Password: `Admin@123`

Then login at: http://localhost:3000/login

---

## 📁 Project Structure

```
adyant-travells/
├── client/                     # React Frontend
│   ├── public/
│   │   └── index.html          # HTML with SEO meta tags
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar.js       # Sticky navbar with mobile menu
│   │   │   ├── Footer.js       # Full footer with links
│   │   │   ├── Loader.js       # Loading animation
│   │   │   ├── WhatsAppButton.js
│   │   │   └── ScrollToTop.js
│   │   ├── context/
│   │   │   ├── AuthContext.js  # JWT auth state management
│   │   │   └── ThemeContext.js # Dark/light mode
│   │   ├── pages/
│   │   │   ├── HomePage.js     # Full home with all sections
│   │   │   ├── TravelPage.js   # Travel packages, hotels, flights
│   │   │   ├── WeddingPage.js  # Wedding services & packages
│   │   │   ├── BookingPage.js  # Booking forms
│   │   │   ├── AboutPage.js    # About us page
│   │   │   ├── ContactPage.js  # Contact form + map
│   │   │   ├── LoginPage.js    # User login
│   │   │   ├── RegisterPage.js # User registration
│   │   │   └── AdminDashboard.js # Full admin panel
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css           # Global styles + Tailwind
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                     # Node.js Backend
│   ├── models/
│   │   ├── User.js             # User schema
│   │   ├── Booking.js          # Booking schema
│   │   └── Contact.js          # Contact schema
│   ├── routes/
│   │   ├── auth.js             # /api/auth
│   │   ├── bookings.js         # /api/bookings
│   │   ├── services.js         # /api/services
│   │   ├── contact.js          # /api/contact
│   │   └── admin.js            # /api/admin (protected)
│   ├── middleware/
│   │   └── auth.js             # JWT protect + adminOnly
│   ├── index.js                # Express app entry point
│   ├── .env.example
│   └── package.json
│
├── package.json                # Root scripts
├── .gitignore
└── README.md
```

---

## 🔌 API Reference

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (auth required) |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings/my` | Get user's bookings (auth) |
| GET | `/api/bookings/:bookingId` | Get booking by ID |

### Services
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services/travel-packages` | Get travel packages |
| GET | `/api/services/wedding-packages` | Get wedding packages |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |

### Admin (Admin auth required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Dashboard stats |
| GET | `/api/admin/bookings` | All bookings |
| PUT | `/api/admin/bookings/:id` | Update booking status |
| GET | `/api/admin/contacts` | All contact queries |
| GET | `/api/admin/users` | All users |
| POST | `/api/admin/seed` | Create default admin |

---

## 🎨 Design System

- **Primary Font:** Cormorant Garamond (Display/Headings)
- **Body Font:** Jost (Body text)
- **Script Font:** Dancing Script (Decorative)
- **Primary Color:** `#C9A84C` (Gold)
- **Background:** Deep Royal Purple `#1a0a2e`
- **Accent:** Gold Gradient `#C9A84C → #E4C97B → #A07830`

---

## 📱 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with all sections |
| Travel | `/travel` | Travel services |
| Wedding | `/wedding` | Wedding planning |
| Booking | `/booking` | Booking forms |
| About | `/about` | About us |
| Contact | `/contact` | Contact |
| Login | `/login` | User login |
| Register | `/register` | User registration |
| Admin | `/admin` | Admin dashboard |

---

## 🔧 Troubleshooting

**MongoDB not connecting?**
- Ensure MongoDB is running: `sudo systemctl start mongod` (Linux) or start MongoDB Compass
- Or use MongoDB Atlas (cloud) and update `MONGODB_URI`

**Port already in use?**
- Change `PORT` in `server/.env`
- React defaults to 3000, can be changed via `PORT=3001 npm start`

**Admin login not working?**
- Run the seed endpoint first: `POST http://localhost:5000/api/admin/seed`

---

## 📄 License

MIT License — Free to use and modify for commercial projects.

---

Built with ❤️ for Adyant Travells & Marriage Planner
