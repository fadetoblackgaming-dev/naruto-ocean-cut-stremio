# Deployment Guide - Netlify

This guide will help you deploy the Naruto Ocean Cut Stremio addon to Netlify.

## Quick Deploy

### Option 1: Drag & Drop (Easiest)

1. Go to [Netlify](https://www.netlify.com/)
2. Sign up or log in
3. Click "Add new site" → "Deploy manually"
4. Drag the entire `naruto-ocean-cut-stremio` folder into the upload area
5. Wait for deployment to complete
6. Your addon will be live at: `https://your-site-name.netlify.app/manifest.json`

### Option 2: Git Integration (Recommended)

1. **Initialize Git Repository**
   ```bash
   cd naruto-ocean-cut-stremio
   git init
   git add .
   git commit -m "Initial commit: Naruto Ocean Cut Stremio addon"
   ```

2. **Push to GitHub** (or GitLab/Bitbucket)
   ```bash
   # Create a new repository on GitHub first, then:
   git remote add origin https://github.com/YOUR-USERNAME/naruto-ocean-cut-stremio.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy on Netlify**
   - Go to [Netlify](https://www.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect to your Git provider
   - Select your repository
   - Use these settings:

## Netlify Build Settings

### Configuration (Automatic via netlify.toml)

The `netlify.toml` file in your project root already contains all necessary settings:

- **Build command**: None (static site)
- **Publish directory**: `.` (root directory)
- **Node version**: 18

### Manual Configuration (if needed)

If you need to configure manually in the Netlify dashboard:

1. **Basic build settings**:
   - Build command: (leave empty)
   - Publish directory: `.`
   - Functions directory: (leave empty)

2. **Environment variables**: None needed

3. **Deploy settings**:
   - Production branch: `main`
   - Deploy contexts: Production only

## Custom Domain (Optional)

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow instructions to configure DNS
4. Your manifest URL will be: `https://yourdomain.com/manifest.json`

## Post-Deployment

After deployment, test your addon:

1. Visit your site: `https://your-site-name.netlify.app`
2. Copy the manifest URL shown on the page
3. In Stremio, go to Addons → Add addon
4. Paste the manifest URL
5. Click Install
6. Search for "Naruto Ocean Cut" in Stremio

## Updating the Addon

If you make changes:

1. **With Git integration**:
   ```bash
   git add .
   git commit -m "Update addon"
   git push
   ```
   Netlify will automatically redeploy.

2. **Manual deployment**:
   - Just drag and drop the updated folder again

## Troubleshooting

### CORS Issues
The `netlify.toml` file includes proper CORS headers. If you still have issues:
- Check that the file was deployed correctly
- Verify headers in browser DevTools → Network tab

### 404 Errors
Make sure:
- The `netlify.toml` file is in the root directory
- You're deploying the entire folder, not just contents

### Manifest Not Found
- Check the URL: it should be `https://your-site.netlify.app/manifest.json`
- Verify the manifest.json file is in the root of your published directory

## Support

- Netlify Docs: https://docs.netlify.com/
- Stremio Addon SDK: https://github.com/Stremio/stremio-addon-sdk

## Summary

Your Netlify deployment is fully configured with:
✅ Static file hosting
✅ CORS headers for Stremio
✅ Landing page with install instructions
✅ Automatic manifest URL detection
✅ One-click copy functionality

Just deploy and share your manifest URL!
