# Google Analytics Setup Guide for Your Portfolio

## 📊 Step-by-Step Instructions

### Step 1: Create a Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **"Start measuring"** or **"Admin"** (gear icon)

### Step 2: Set Up a Property
1. Click **"Create Property"**
2. Fill in the details:
   - **Property name**: `Harshit Kulkarni Portfolio`
   - **Reporting time zone**: Select your timezone (India - IST)
   - **Currency**: INR (Indian Rupee)
3. Click **"Next"**

### Step 3: About Your Business
1. Select industry category: **"Computers & Electronics"** or **"Technology"**
2. Business size: **"Small"** (1-10 employees)
3. Select how you plan to use Google Analytics:
   - ✅ Get to know my customers
   - ✅ Measure my advertising ROI
4. Click **"Create"**

### Step 4: Choose Data Collection Platform
1. Select **"Web"**
2. Click **"Next"**

### Step 5: Set Up Data Stream
1. Enter your website details:
   - **Website URL**: `https://yourportfolio.netlify.app` (or your actual domain)
   - **Stream name**: `Portfolio Website`
   - ✅ Enable **"Enhanced measurement"** (recommended)
2. Click **"Create stream"**

### Step 6: Get Your Measurement ID
1. After creating the stream, you'll see your **Measurement ID**
2. It looks like: `G-XXXXXXXXXX` (starts with G-)
3. **Copy this ID** - you'll need it next!

### Step 7: Add to Your Portfolio

**Option A: Manual Edit (Simple)**
1. Open `index.html` in your editor
2. Find line 52: `<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>`
3. Replace `GA_MEASUREMENT_ID` with your actual ID (e.g., `G-ABC123XYZ`)
4. Also replace it on line 58: `gtag('config', 'GA_MEASUREMENT_ID');`

**Your code should look like:**
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-ABC123XYZ');
</script>
```

### Step 8: Deploy to Netlify
1. Commit your changes:
   ```bash
   git add index.html
   git commit -m "Add Google Analytics tracking"
   git push
   ```
2. Netlify will automatically redeploy

### Step 9: Verify It's Working
1. Visit your deployed website
2. Go back to Google Analytics
3. Click **"Reports"** → **"Realtime"**
4. You should see yourself as an active user!

---

## 🎯 What Analytics Will Track

With the current setup, Google Analytics will automatically track:

✅ **Page Views** - Which pages users visit
✅ **Sessions** - How long users stay on your site
✅ **Traffic Sources** - Where visitors come from (Google, LinkedIn, etc.)
✅ **Geography** - Where in the world your visitors are from
✅ **Devices** - Desktop vs Mobile vs Tablet
✅ **Bounce Rate** - How many leave after viewing one page
✅ **Resume Downloads** - Custom event tracking (already implemented in Hero.tsx)

---

## 📈 Accessing Your Analytics Dashboard

1. Go to [analytics.google.com](https://analytics.google.com)
2. Select your property: **"Harshit Kulkarni Portfolio"**
3. Explore the reports:
   - **Realtime**: See live visitors right now
   - **Acquisition**: Where traffic comes from
   - **Engagement**: What pages are most popular
   - **Demographics**: Age, gender, interests of visitors

---

## 🔒 Privacy & GDPR Compliance (Optional but Recommended)

If you want to be extra compliant, you can add a simple cookie notice:

1. Consider anonymizing IP addresses (Google does this by default now)
2. Add a Privacy Policy page mentioning Google Analytics
3. For EU visitors, you may want to add a cookie consent banner

---

## ⚡ Quick Reference

**Your Measurement ID location in code:**
- File: `index.html`
- Lines: 52, 58
- Format: `G-XXXXXXXXXX`

**Custom Events Already Tracked:**
- Resume downloads (tracked in `src/components/Hero.tsx`)

**Next Steps:**
1. Get your measurement ID from Google Analytics
2. Replace `GA_MEASUREMENT_ID` in `index.html` (2 places)
3. Deploy to Netlify
4. Check Realtime reports to verify

---

## 🆘 Troubleshooting

**Not seeing data?**
- Wait 24-48 hours for initial data to populate
- Check Realtime reports (shows instant data)
- Verify the measurement ID is correct
- Make sure you deployed the changes
- Try visiting your site in an incognito window

**Need help?**
- [Google Analytics Help Center](https://support.google.com/analytics)
- Make sure Enhanced Measurement is enabled in GA4

---

Good luck! 🎉
