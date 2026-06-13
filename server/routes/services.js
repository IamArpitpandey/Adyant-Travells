const express = require('express');
const router = express.Router();

// Static services data (in production, this would be from DB)
const travelPackages = [
  {
    id: 1,
    name: "Kerala Backwaters Bliss",
    destination: "Kerala, India",
    duration: "5 Days / 4 Nights",
    price: 28999,
    originalPrice: 35000,
    rating: 4.8,
    reviews: 234,
    category: "domestic",
    highlights: ["Houseboat Stay", "Ayurveda Spa", "Munnar Tea Gardens", "Alleppey Backwaters"],
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Rajasthan Royal Heritage",
    destination: "Rajasthan, India",
    duration: "7 Days / 6 Nights",
    price: 42999,
    originalPrice: 55000,
    rating: 4.9,
    reviews: 189,
    category: "domestic",
    highlights: ["Palace Hotels", "Desert Safari", "Jaipur City Tour", "Udaipur Lake"],
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600",
    badge: "Premium"
  },
  {
    id: 3,
    name: "Bali Tropical Paradise",
    destination: "Bali, Indonesia",
    duration: "6 Days / 5 Nights",
    price: 65999,
    originalPrice: 80000,
    rating: 4.7,
    reviews: 312,
    category: "international",
    highlights: ["Villa Stay", "Temple Tours", "Rice Terrace Trek", "Seafood Dinner"],
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
    badge: "Popular"
  },
  {
    id: 4,
    name: "Switzerland Alps Adventure",
    destination: "Switzerland, Europe",
    duration: "8 Days / 7 Nights",
    price: 145999,
    originalPrice: 175000,
    rating: 4.9,
    reviews: 156,
    category: "international",
    highlights: ["Jungfraujoch", "Lake Geneva", "Zurich City", "Swiss Chocolate Tour"],
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600",
    badge: "Luxury"
  },
  {
    id: 5,
    name: "Goa Beach Getaway",
    destination: "Goa, India",
    duration: "4 Days / 3 Nights",
    price: 18999,
    originalPrice: 24000,
    rating: 4.6,
    reviews: 445,
    category: "domestic",
    highlights: ["Beach Resort", "Water Sports", "Night Markets", "Portuguese Heritage"],
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600",
    badge: "Budget Friendly"
  },
  {
    id: 6,
    name: "Dubai Luxury Experience",
    destination: "Dubai, UAE",
    duration: "5 Days / 4 Nights",
    price: 89999,
    originalPrice: 110000,
    rating: 4.8,
    reviews: 267,
    category: "international",
    highlights: ["Burj Khalifa", "Desert Safari", "Dubai Mall", "Dhow Cruise"],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600",
    badge: "Trending"
  }
];

const weddingPackages = [
  {
    id: 1,
    name: "Silver Bliss",
    price: 250000,
    features: [
      "Venue for up to 200 guests",
      "Basic floral decoration",
      "Photography (8 hours)",
      "Catering (vegetarian menu)",
      "Basic makeup for bride",
      "Wedding coordination"
    ],
    notIncluded: ["Videography", "Pre-wedding shoot", "DJ & Entertainment"],
    color: "#C0C0C0",
    popular: false
  },
  {
    id: 2,
    name: "Golden Dreams",
    price: 550000,
    features: [
      "Venue for up to 500 guests",
      "Premium floral & theme decoration",
      "Photography + Videography (12 hours)",
      "Catering (veg & non-veg buffet)",
      "Bridal makeup & hair styling",
      "Groom grooming package",
      "DJ & Entertainment",
      "Mehendi ceremony",
      "Pre-wedding photoshoot",
      "Dedicated wedding planner"
    ],
    notIncluded: ["Honeymoon package"],
    color: "#FFD700",
    popular: true
  },
  {
    id: 3,
    name: "Platinum Royale",
    price: 1200000,
    features: [
      "Luxury venue for up to 1000 guests",
      "Grand theme decoration (unlimited)",
      "Photography + Cinematic Videography",
      "5-star catering with live counters",
      "Celebrity-style bridal makeup",
      "Groom styling & wardrobe",
      "Live band + DJ + entertainment",
      "Destination honeymoon package",
      "All ceremonies covered",
      "Luxury car fleet",
      "Drone photography",
      "24/7 dedicated planner team"
    ],
    notIncluded: [],
    color: "#E5E4E2",
    popular: false
  }
];

// @GET /api/services/travel-packages
router.get('/travel-packages', (req, res) => {
  const { category, minPrice, maxPrice, search } = req.query;
  let packages = [...travelPackages];
  
  if (category && category !== 'all') {
    packages = packages.filter(p => p.category === category);
  }
  if (minPrice) packages = packages.filter(p => p.price >= parseInt(minPrice));
  if (maxPrice) packages = packages.filter(p => p.price <= parseInt(maxPrice));
  if (search) {
    packages = packages.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.destination.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  res.json({ success: true, count: packages.length, packages });
});

// @GET /api/services/wedding-packages
router.get('/wedding-packages', (req, res) => {
  res.json({ success: true, packages: weddingPackages });
});

// @GET /api/services/all
router.get('/all', (req, res) => {
  res.json({
    success: true,
    travelPackages,
    weddingPackages
  });
});

module.exports = router;
