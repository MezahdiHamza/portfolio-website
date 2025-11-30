# Deployment Guide

## GitHub Pages Deployment

### Step 1: Prepare Repository

1. Ensure all files are committed:
   ```bash
   git status
   git add .
   git commit -m "Prepare for deployment"
   ```

2. Push to GitHub:
   ```bash
   git push origin main
   ```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Branch**: `main` (or your default branch)
   - **Folder**: `/` (root)
4. Click **Save**

### Step 3: Verify Deployment

Your site will be available at:
```
https://[your-username].github.io/portfolio-website/
```

**Note**: It may take a few minutes for the site to be live.

### Step 4: Update URLs

If your site URL changes, update:
- `manifest.json` - `start_url`
- HTML files - canonical URLs, OG tags
- Any absolute paths

## Manual Deployment (Static Hosting)

### For Netlify, Vercel, etc.

1. **Build the project** (if needed):
   ```bash
   npm run build
   ```

2. **Upload files**:
   - Upload all HTML, CSS, JS files
   - Upload images folder
   - Upload manifest.json

3. **Configure**:
   - Set index.html as entry point
   - Configure redirects if needed

### Important Notes

- **Backend API**: GitHub Pages only hosts static files. The contact form backend won't work on GitHub Pages. You'll need:
  - A separate backend service (Heroku, Railway, etc.)
  - Or use a form service (Formspree, Netlify Forms, etc.)

- **API Endpoint**: Update `contact.js` to point to your backend URL:
  ```javascript
  const API_URL = 'https://your-backend.herokuapp.com/api/contact';
  ```

## Environment-Specific Configuration

### Development
- API URL: `http://localhost:3000/api/contact`
- Debug mode: Enabled

### Production
- API URL: Your production backend URL
- Debug mode: Disabled
- Minified CSS/JS (if using build process)

## Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Contact form works (if backend is set up)
- [ ] Mobile navigation works
- [ ] All links are functional
- [ ] No console errors
- [ ] Lighthouse scores meet targets
- [ ] SEO meta tags are correct
- [ ] Social sharing works (OG tags)
- [ ] HTTPS is enabled
- [ ] Custom domain configured (if applicable)

## Troubleshooting Deployment

### Issue: 404 Errors
- Check file paths (case-sensitive on some servers)
- Verify all files are uploaded
- Check .gitignore isn't excluding needed files

### Issue: Styles Not Loading
- Verify CSS file paths are correct
- Check CORS settings if loading from CDN
- Ensure CSS files are in correct location

### Issue: JavaScript Not Working
- Check browser console for errors
- Verify JS files are loaded
- Check for CORS issues
- Ensure scripts are loaded in correct order

### Issue: Images Not Displaying
- Verify image paths (relative vs absolute)
- Check file sizes (some hosts have limits)
- Ensure images are in correct folder

## Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## Monitoring

After deployment, monitor:
- Page load times
- Error rates
- User feedback
- Analytics (if implemented)

---

**Need Help?** Check the main README.md or open an issue on GitHub.

