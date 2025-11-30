# Portfolio Website

A modern, responsive portfolio website with a contact form feature, backend API, and database integration. Fully refactored and optimized for performance, accessibility, and SEO.

## 🚀 Features

- 🎨 Modern and responsive design
- 📱 Mobile-friendly layout with hamburger menu
- ♿ Fully accessible (WCAG AA compliant)
- 🔍 SEO optimized with structured data
- 📧 Contact form with backend integration
- 💾 SQLite database for storing messages
- 🚀 Express.js backend API
- ✨ Smooth animations and transitions
- 🎯 Progressive enhancement
- 📊 Performance optimized

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Modular), JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Styling**: Custom CSS with CSS Variables
- **Fonts**: Google Fonts (Inter)

## 📁 Project Structure

```
portfolio-website/
├── styles/
│   ├── base.css          # Base styles and CSS variables
│   ├── components.css    # Reusable component styles
│   ├── layout.css        # Layout and grid styles
│   └── main.css          # Main stylesheet (imports all)
├── scripts/
│   ├── main.js          # Consolidated JavaScript
│   ├── portfolio.js      # Portfolio slider
│   └── contact.js       # Contact form handler
├── images/              # Optimized images
├── index.html           # Homepage
├── aboutme.html         # About page
├── portfolio.html       # Portfolio page
├── contact.html         # Contact page
├── socialmedia.html      # Social media page
├── manifest.json        # PWA manifest
├── package.json         # Dependencies
├── server.js            # Express backend
├── README.md            # This file
├── CHANGELOG.md         # Version history
└── audit-report.md      # Audit findings
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download this repository

```bash
git clone https://github.com/mezahdihamza/portfolio-website.git
cd portfolio-website
```

2. Install Node.js dependencies:

```bash
npm install
```

## 🏃 Running the Application

### Development Mode

Start the backend server with auto-reload:

```bash
npm run dev
```

### Production Mode

Start the server:

```bash
npm start
```

The server will run on port 3000 by default. You can change this by setting the `PORT` environment variable.

Open your browser and navigate to:
```
http://localhost:3000
```

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

1. **Prepare for GitHub Pages**:
   - Ensure all paths are relative (not absolute)
   - Update any API endpoints if needed
   - Test locally first

2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select source branch (usually `main` or `gh-pages`)
   - Select root folder
   - Save

4. **Your site will be available at**:
   ```
   https://[username].github.io/portfolio-website/
   ```

### Manual Deployment Steps

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Test locally**:
   ```bash
   npm start
   ```

3. **Deploy files**:
   - Upload all files to your hosting provider
   - Ensure Node.js is supported for backend
   - For static hosting, you may need to remove backend dependencies

## 🧪 Testing

### Manual Testing Checklist

- [ ] **Responsive Design**
  - Test at 320px, 375px, 414px (mobile)
  - Test at 768px (tablet)
  - Test at 1024px, 1920px (desktop)

- [ ] **Accessibility**
  - Tab through all interactive elements
  - Test with screen reader (NVDA/JAWS/VoiceOver)
  - Check color contrast
  - Verify all images have alt text

- [ ] **Functionality**
  - Test contact form submission
  - Test portfolio slider navigation
  - Test mobile hamburger menu
  - Test all links (internal and external)

- [ ] **Performance**
  - Run Lighthouse audit (Chrome DevTools)
  - Check image loading
  - Verify lazy loading works
  - Test without JavaScript (progressive enhancement)

- [ ] **Cross-browser**
  - Chrome/Edge (Chromium)
  - Firefox
  - Safari
  - Mobile browsers

### Lighthouse Audit

Run Lighthouse in Chrome DevTools:
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select categories (Performance, Accessibility, Best Practices, SEO)
4. Click "Generate report"

**Target Scores:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 90

## 📡 API Endpoints

### POST `/api/contact`
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully!",
  "id": 1
}
```

### GET `/api/contacts`
Get all contact messages (for viewing stored messages).

**Note**: This endpoint may require authentication in production.

## 🎨 Design System

### Colors
- **Primary**: `#a855f7` (Purple)
- **Primary Dark**: `#7e22ce` (Dark Purple)
- **Accent**: `#00ffff` (Cyan)
- **Background**: `#150b28` (Dark)
- **Text**: `#eae2ff` (Light)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Base Size**: 16px
- **Scale**: Responsive with clamp()

### Spacing
- **XS**: 0.5rem (8px)
- **SM**: 1rem (16px)
- **MD**: 1.5rem (24px)
- **LG**: 2rem (32px)
- **XL**: 3rem (48px)

## 🔧 Configuration

### Environment Variables

Create a `.env` file (optional):

```env
PORT=3000
NODE_ENV=production
```

### Customization

1. **Colors**: Edit `styles/base.css` CSS variables
2. **Content**: Update HTML files
3. **Images**: Replace images in root or `images/` folder
4. **API**: Modify `server.js` for backend changes

## 📝 Code Quality

### Linting

```bash
npm run lint
```

### Code Style

- Use semantic HTML5
- Follow BEM-like naming for CSS classes
- Use ES6+ JavaScript features
- Comment complex logic

## 🐛 Troubleshooting

### Common Issues

1. **Portfolio cards overflow**:
   - Check CSS flex calculations
   - Verify container width
   - Test responsive breakpoints

2. **Images not loading**:
   - Check file paths (relative vs absolute)
   - Verify image files exist
   - Check browser console for errors

3. **Mobile menu not working**:
   - Ensure `scripts/main.js` is loaded
   - Check for JavaScript errors
   - Verify hamburger button exists

4. **Contact form not submitting**:
   - Check if backend server is running
   - Verify API endpoint URL
   - Check browser console for errors

## 📄 License

MIT License - see LICENSE file for details

## 👤 Author

**Hamza Mezahdi**
- GitHub: [@MezahdiHamza](https://github.com/MezahdiHamza)
- LinkedIn: [hamza-mezahdi-60a384358](https://www.linkedin.com/in/hamza-mezahdi-60a384358/)
- Email: mezahdihamza1@gmail.com

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Icons from various sources
- Fonts from Google Fonts

## 📚 Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [Web.dev](https://web.dev/)
- [A11y Project](https://www.a11yproject.com/)
- [Can I Use](https://caniuse.com/)

---

**Last Updated**: 2024
**Version**: 2.0.0
