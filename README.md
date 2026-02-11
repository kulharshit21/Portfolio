# Harshit Kulkarni Portfolio

A modern, responsive, and accessible portfolio website built with React, TypeScript, and Tailwind CSS, showcasing the work of Harshit Kulkarni - ML Researcher, Full-Stack Developer, and IEEE Published Author.

## ✨ Features

### Core Features
- **Responsive Design** - Optimized for all device sizes (mobile, tablet, desktop)
- **Interactive Animations** - Smooth transitions, typing effects, and floating elements
- **Modern UI** - Starry night background with gradient themes
- **Comprehensive Sections** - Skills, projects, experience, education, certifications, and more
- **Functional Contact Form** - Email integration with auto-reply

### Recent Enhancements 🚀

#### SEO & Discoverability
- ✅ Comprehensive meta tags (Open Graph, Twitter Cards)
- ✅ Enhanced descriptions for search engines
- ✅ Canonical URLs and proper schema markup
- ✅ Optimized for social media sharing

#### Accessibility (WCAG Compliant)
- ✅ Skip navigation links
- ✅ ARIA labels on all interactive elements
- ✅ Semantic HTML structure
- ✅ Descriptive alt text for images
- ✅ Keyboard navigation support

#### User Experience
- ✅ **Loading Screen** - Professional animated loading experience
- ✅ **Scroll Progress Bar** - Visual indicator of page scroll position
- ✅ **Back to Top Button** - Quick navigation to top
- ✅ **Active Section Highlighting** - Navbar highlights current section
- ✅ **Enhanced Mobile Menu** - Slide-in animation with backdrop blur
- ✅ **Error Boundary** - Graceful error handling

#### Contact Form Enhancements
- ✅ **Character Counter** - Real-time feedback (max 1000 chars)
- ✅ **Email Validation** - Client-side validation before submission
- ✅ **Rate Limiting** - Spam prevention (1 submission per minute)
- ✅ **Success Animation** - Confetti celebration on successful send
- ✅ **Better Error Messages** - Clear feedback for validation errors

#### Analytics & Tracking
- ✅ **Google Analytics Integration** - Track visitor behavior
- ✅ **Resume Download Tracking** - Monitor engagement
- ✅ **Event Tracking** - User interaction analytics

#### Performance Optimizations
- ✅ **will-change CSS property** - GPU acceleration for animations
- ✅ **Lazy loading ready** - Prepared for code splitting
- ✅ **Optimized animations** - Smooth 60fps performance

## Technologies Used

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Lightning-fast build tool
- **Lucide React** - Beautiful, consistent icons

### Backend
- **Netlify Functions** - Serverless contact form handler
- **Nodemailer** - Email sending with Gmail SMTP
- **Express.js** - Local development server

## Setup and Installation

### Prerequisites
- Node.js 16+ installed
- Gmail account (for contact form)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/kulharshit21/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173`

## Building for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

Preview the production build:
```bash
npm run preview
```

## Deployment

### Deploy to Netlify (Recommended)

1. Push code to GitHub
2. Connect repository to Netlify
3. Configure environment variables in Netlify dashboard:
   - `SMTP_HOST` = smtp.gmail.com
   - `SMTP_PORT` = 465
   - `SMTP_USER` = your-email@gmail.com
   - `SMTP_PASS` = your-gmail-app-password
   - `RECIPIENT` = your-email@gmail.com

4. Deploy!

See `DEPLOYMENT.md` for detailed deployment instructions.

### Google Analytics Setup

1. Create a Google Analytics account at analytics.google.com
2. Get your Measurement ID (format: G-XXXXXXXXXX)
3. Replace `GA_MEASUREMENT_ID` in `index.html` with your actual ID

## Project Structure

```
Portfolio/
├── src/
│   ├── components/          # React components
│   │   ├── ErrorBoundary.tsx    # Error handling
│   │   ├── LoadingScreen.tsx    # Initial load animation
│   │   ├── ScrollProgress.tsx   # Scroll indicator
│   │   ├── BackToTop.tsx        # Scroll to top button
│   │   ├── Navbar.tsx           # Navigation with active tracking
│   │   ├── Hero.tsx             # Hero + About section
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Education.tsx
│   │   ├── Certifications.tsx
│   │   ├── Contact.tsx          # Enhanced contact form
│   │   └── Footer.tsx
│   ├── App.tsx              # Main app with error boundary
│   ├── index.css            # Global styles + animations
│   └── main.tsx             # Entry point
├── netlify/
│   └── functions/
│       └── contact.js       # Serverless email handler with rate limiting
├── public/                  # Static assets
└── Configuration files
```

## Key Features Breakdown

### 1. Loading Screen
- Animated spinner with branding
- Smooth fade-in transition
- Prevents layout shift

### 2. Scroll Progress Bar
- Real-time scroll position tracking
- Gradient color design
- Fixed at top of viewport

### 3. Enhanced Contact Form
- Character count with visual feedback
- Email format validation
- Minimum length requirements
- Rate limiting (server-side)
- Beautiful success modal with confetti

### 4. Mobile Experience
- Slide-in navigation menu
- Backdrop blur overlay
- Touch-optimized interactions
- Responsive typography

### 5. Error Handling
- Error boundary catches runtime errors
- User-friendly error messages
- Reload and home navigation options

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 12+)
- Mobile Chrome (Android 8+)

## Performance

- Lighthouse Score Target: 90+ (all categories)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## Contact

**Harshit Kulkarni**  
📧 Email: kulharshit21@gmail.com | hk0534@srmist.edu.in  
📱 Phone: +91 8310381878  
📍 Location: Chennai, Tamil Nadu 603203

### Connect
- [LinkedIn](https://www.linkedin.com/in/harshit-kulkarni-4a6554276)
- [GitHub](https://github.com/kulharshit21)
- [Google Scholar](https://scholar.google.com/citations?user=vNAKXr8AAAAJ&hl=en)
- [ResearchGate](https://www.researchgate.net/profile/Harshit-Kulkarni-4)

## License

ISC

---

**Built with ❤️ by Harshit Kulkarni**