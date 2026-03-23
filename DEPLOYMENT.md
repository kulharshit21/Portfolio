# 🚀 Deployment Guide - Netlify with Email Service

This guide will help you deploy your portfolio to Netlify with a fully functional contact form using Gmail SMTP.

---

## 📋 Prerequisites

1. **GitHub Account** (to push your code)
2. **Netlify Account** (free at [netlify.com](https://netlify.com))
3. **Gmail App Password** (generate one at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords))

---

## 🎯 Step-by-Step Deployment

### Step 1: Push Your Code to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   cd d:\Portfolio\project
   git init
   ```

2. **Add all files**:
   ```bash
   git add .
   ```

3. **Commit your changes**:
   ```bash
   git commit -m "Initial commit - Portfolio with contact form"
   ```

4. **Create a new repository on GitHub**:
   - Go to [github.com/new](https://github.com/new)
   - Name it: `harshit-portfolio` (or any name)
   - Don't initialize with README (you already have files)
   - Click "Create repository"

5. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/harshit-portfolio.git
   git branch -M main
   git push -u origin main
   ```

---

### Step 2: Deploy to Netlify

#### Option A: Deploy via Netlify Dashboard (Recommended)

1. **Login to Netlify**:
   - Go to [app.netlify.com](https://app.netlify.com)
   - Login with your GitHub account

2. **Create New Site**:
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Authorize Netlify to access your repositories
   - Select your `harshit-portfolio` repository

3. **Configure Build Settings**:
   - **Branch to deploy**: `main`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - Netlify will auto-detect these from `netlify.toml` ✅

4. **Click "Deploy site"**
   - Netlify will assign you a random URL like: `random-name-123.netlify.app`

#### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
cd d:\Portfolio\project
netlify deploy --prod
```

---

### Step 3: Configure Environment Variables (CRITICAL!)

Your contact form **will NOT work** without these environment variables!

1. **Go to Netlify Dashboard**:
   - Open your site
   - Click "Site configuration" → "Environment variables"

2. **Add the following variables**:

   | Variable | Value |
   |----------|-------|
   | `SMTP_HOST` | `smtp.gmail.com` |
   | `SMTP_PORT` | `465` |
   | `SMTP_USER` | `kulharshit21@gmail.com` |
   | `SMTP_PASS` | `<your Gmail App Password>` |
   | `RECIPIENT` | `kulharshit21@gmail.com` |

3. **⚠️ IMPORTANT**: After adding environment variables, you MUST redeploy:
   - Go to "Deploys" tab
   - Click "Trigger deploy" → "Deploy site"

---

### Step 4: Configure Custom Domain (Optional)

1. **In Netlify Dashboard**:
   - Go to "Domain management"
   - Click "Add custom domain"
   - Enter your domain (e.g., `harshitkulkarni.com`)

2. **Update DNS Records**: (if you own a domain)
   - Add Netlify's nameservers or
   - Add A/CNAME records to point to Netlify

---

## 🧪 Testing Your Deployment

### 1. Test the Website
- Visit your Netlify URL: `https://your-site.netlify.app`
- Check all sections load correctly
- Verify navigation works

### 2. Test Contact Form (CRITICAL!)
1. Navigate to the Contact section
2. Fill out the form with test data
3. Submit the form
4. **Expected Results**:
   - ✅ Success message appears
   - ✅ You receive an email at `kulharshit21@gmail.com`
   - ✅ The sender receives an auto-reply email

### 3. Check Netlify Function Logs
- Go to Netlify Dashboard → "Functions" tab
- Click on `contact` function
- View logs to debug any issues

---

## 🔧 Troubleshooting

### Issue 1: Contact form says "Failed to send"
**Solution**:
- Check if environment variables are set correctly
- Redeploy after adding environment variables
- Check Function logs in Netlify dashboard

### Issue 2: Emails not sending
**Solution**:
- Verify Gmail App Password is correct (generate a new one at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords))
- Ensure `SMTP_PORT` is `465` (not 587)
- Check if Gmail account has "Less secure app access" enabled (if needed)

### Issue 3: Build failed
**Solution**:
- Check build logs in Netlify
- Ensure `package.json` has all dependencies
- Try building locally: `npm run build`

### Issue 4: 404 errors on page refresh
**Solution**:
- Already handled by `netlify.toml` redirects ✅
- All routes redirect to `index.html` (SPA behavior)

---

## 📂 Project Structure for Deployment

```
project/
├── netlify/
│   └── functions/
│       └── contact.js          # Serverless function for emails
├── netlify.toml                 # Netlify configuration
├── dist/                        # Build output (auto-generated)
├── src/                         # React source code
├── package.json
└── vite.config.ts
```

---

## 🔐 Security Notes

1. **Never commit `.env` files** to GitHub ✅ (Already in `.gitignore`)
2. **Use environment variables** in Netlify Dashboard for secrets ✅
3. **Gmail App Password** is more secure than regular password ✅
4. **CORS is configured** for your Netlify domain ✅

---

## 📊 Monitoring & Analytics

### Netlify Analytics (Optional - Paid)
- Go to "Analytics" tab in Netlify
- Enable Netlify Analytics for visitor tracking

### Google Analytics (Free)
- Add Google Analytics code to `index.html`
- Track visitors, page views, and form submissions

---

## 🔄 Continuous Deployment

Once connected to GitHub, Netlify will automatically:
- ✅ Deploy when you push to `main` branch
- ✅ Create preview deploys for pull requests
- ✅ Run build and tests

To push updates:
```bash
git add .
git commit -m "Update portfolio"
git push origin main
```
Netlify will auto-deploy in ~2 minutes!

---

## 🎉 What You Get After Deployment

✅ **Live Portfolio**: `https://your-site.netlify.app`  
✅ **Automatic HTTPS**: Netlify provides free SSL  
✅ **Contact Form**: Fully working with email notifications + auto-reply  
✅ **Fast CDN**: Globally distributed content delivery  
✅ **Auto-deploys**: Push to GitHub = Auto deploy  
✅ **Serverless Functions**: Contact form runs on Netlify Functions (no separate backend needed!)

---

## 📞 Support

If you encounter issues:
1. Check Netlify Function logs
2. Verify environment variables are set
3. Test locally first: `npm run dev` and `node server/index.js`
4. Check Gmail SMTP settings

---

## ✅ Quick Checklist

Before deploying:
- [ ] Code is pushed to GitHub
- [ ] `.env` file is in `.gitignore`
- [ ] `netlify.toml` is configured
- [ ] `netlify/functions/contact.js` exists

After deploying:
- [ ] Environment variables added in Netlify Dashboard
- [ ] Triggered redeploy after adding variables
- [ ] Tested contact form on live site
- [ ] Verified emails are sending correctly

---

**🎊 You're all set! Your portfolio is now live with a fully functional contact form!**
