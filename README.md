# Addis Café Leipzig - Website

A modern, responsive website for Addis Café Leipzig, an authentic Ethiopian restaurant in Leipzig, Germany.

## Features

✨ **Modern Design**
- Ethiopian-inspired color scheme (gold, deep red, green)
- Responsive layout for all devices
- Smooth animations and transitions
- Glassmorphism effects

🍽️ **Complete Menu**
- Appetizers, main dishes, vegan options
- Desserts and kids menu
- Prices in euros
- Organized by categories

📸 **Interactive Gallery**
- 16 restaurant and food images
- Lightbox with keyboard navigation
- Touch gestures for mobile
- Smooth transitions

📅 **Table Reservations**
- Integrated with Supabase database
- Form validation
- Date/time picker
- Party size selection
- Special requests field

📱 **WhatsApp Integration**
- Floating contact button
- Direct messaging link
- Pulse animation

🗺️ **Interactive Map**
- Leaflet.js integration
- Custom marker design
- Popup with directions link
- Restaurant location: Brüderstraße 39, 04103 Leipzig

## Technology Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with custom properties
- **JavaScript (ES6+)** - Interactive functionality
- **Supabase** - Database for reservations
- **Leaflet.js** - Interactive maps
- **Google Fonts** - Playfair Display & Inter

## Setup Instructions

### 1. Files Structure
```
restaurant_example_002/
├── index.html
├── styles.css
├── script.js
├── SUPABASE_SETUP.md
├── README.md
└── assets/
    └── images/
        └── galery/
            ├── backgroung.png (hero background)
            └── Screenshot 2025-12-29 *.png (gallery images)
```

### 2. Supabase Database Setup

**IMPORTANT:** Before the reservation system will work, you need to set up the Supabase database table.

Follow the instructions in `SUPABASE_SETUP.md` to:
1. Access your Supabase dashboard
2. Run the SQL script to create the `reservations` table
3. Set up Row Level Security policies

### 3. Local Development

Simply open `index.html` in a web browser. No build process required!

For a local server (recommended):
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

### 4. Configuration

The following settings are configured in `script.js`:

```javascript
const SUPABASE_URL = 'https://fgpdpafbshjmhttifpca.supabase.co';
const SUPABASE_KEY = 'your-anon-key-here';
```

**WhatsApp Number:** +49 341 24831144

**Restaurant Location:** 51.3397, 12.3731 (Brüderstraße 39, Leipzig)

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Features Breakdown

### Navigation
- Sticky header with scroll effect
- Smooth scrolling to sections
- Active section highlighting
- Mobile hamburger menu

### Hero Section
- Full-screen background image
- Gradient overlay
- Animated content
- Call-to-action buttons
- Scroll indicator

### About Section
- Restaurant description
- Feature cards (vegan, women-owned, LGBTQ+ friendly, coffee)
- Highlights (price range, atmosphere, services)

### Menu Section
- Organized by categories
- Hover effects on menu items
- Featured items highlighted
- Vegan section with special styling

### Gallery
- 16 images in responsive grid
- Lightbox viewer
- Keyboard navigation (←, →, Esc)
- Touch gestures for mobile
- Image counter

### Reservation System
- Date picker (no past dates)
- Time validation (4 PM - 11 PM)
- Party size selector (1-10+ people)
- Email and phone validation
- Special requests field
- Supabase integration
- Success/error messages
- Loading states

### Contact Section
- Address, phone, website
- Accessibility information
- Interactive map with custom marker
- WhatsApp floating button

### Footer
- Quick links
- Opening hours
- Contact information
- Copyright notice

## Accessibility

- ♿ Semantic HTML5 elements
- 🎯 ARIA labels on interactive elements
- ⌨️ Keyboard navigation support
- 🖼️ Alt text for all images
- 🎨 WCAG AA color contrast
- 👁️ Focus indicators
- 🔄 Reduced motion support

## Performance

- 🚀 Lazy loading images
- 📦 Minimal dependencies
- ⚡ Optimized CSS and JavaScript
- 🎯 Intersection Observer for animations
- 📱 Mobile-first responsive design

## SEO

- 📝 Proper meta tags
- 🏷️ Semantic HTML structure
- 📊 Structured data ready
- 🔍 Descriptive alt text
- 📱 Mobile-friendly

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --color-primary: #D4AF37;    /* Gold */
    --color-secondary: #8B0000;  /* Deep Red */
    --color-accent: #2D5016;     /* Ethiopian Green */
}
```

### Restaurant Information
Update in `index.html`:
- Business hours
- Address
- Phone number
- Menu items and prices

### Map Location
Update in `script.js`:
```javascript
const restaurantLocation = [51.3397, 12.3731]; // [latitude, longitude]
```

## Deployment

### Option 1: Static Hosting
Upload all files to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### Option 2: Traditional Hosting
Upload via FTP to your web host.

### Environment Variables
For production, consider moving Supabase credentials to environment variables.

## Support

For issues or questions:
- 📧 Email: info@addis-cafe.de
- 📞 Phone: +49 341 24831144
- 🌐 Website: https://addis-cafe.de

## License

© 2025 Addis Café Leipzig. All rights reserved.

## Credits

- **Design & Development:** Custom built
- **Fonts:** Google Fonts (Playfair Display, Inter)
- **Maps:** Leaflet.js & OpenStreetMap
- **Database:** Supabase
- **Icons:** Unicode emoji

---

**Enjoy authentic Ethiopian cuisine! 🍽️🇪🇹**
