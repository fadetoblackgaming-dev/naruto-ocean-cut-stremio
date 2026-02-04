# Naruto Ocean Cut - Stremio Addon

A Stremio addon for watching the **Naruto Ocean Cut** - a fan-edited version of Naruto (2002) with no filler, streamlined pacing, and improved flow.

## What is Naruto Ocean Cut?

The Ocean Cut is a fanmade re-edit of the Naruto TV anime that aims to re-envision the series by removing:
- Excessive flashbacks
- Snail pacing
- Filler content
- Unnecessary recap
- Nonsense padding

**Key Features:**
- ✅ English Dub
- ✅ Multiple episodes condensed into 50min-2hr videos
- ✅ OPs play once per video
- ✅ Important Japanese text translated
- ✅ Flashbacks removed unless necessary
- ✅ Music and VA edited to avoid jarring cuts
- ✅ **95 episodes** total (vs 220 original series episodes)

## Installation

### Method 1: Direct Install (Recommended)

1. Open Stremio
2. Go to the **Addons** section
3. Click on **Community Addons**
4. In the search box at the top, paste this URL:
   ```
   https://YOUR-GITHUB-USERNAME.github.io/naruto-ocean-cut-stremio/manifest.json
   ```
   _(Replace with your actual GitHub Pages URL after deployment)_
5. Click **Install**
6. Done! Search for "Naruto Ocean Cut" in Stremio

### Method 2: Manual Install

1. Copy the manifest URL
2. In Stremio, go to Settings → Addons
3. Scroll down and click on "Add Addon"
4. Paste the manifest URL
5. Click OK

## Episode List

The addon includes **95 episodes** organized across multiple seasons:

- **Season 0**: Land of Waves (Episodes 1-5 + Special)
- **Season 1**: Chunin Exams (Episodes 6-17 + Special)
- **Season 2**: Search for Hope (Episodes 18-21)
- **Season 3**: Retrieval Mission (Episodes 22-28 + Special)
- **Season 4**: Kazekage Rescue (Episodes 29-34)
- **Season 5-18**: Shippuden arcs
- **Season 19**: Epilogue (WIP)
- **Special Season**: Kakashi's Story

## Requirements

To stream the episodes, you need:
1. **Stremio** installed ([download here](https://www.stremio.com/downloads))
2. A **BitTorrent client** (Stremio has one built-in)
3. The **torrent** with seeders (Info Hash: `e0c38ede05e555d337e7d534f4eaaebc773bf913`)

## Deployment

### Deploy to GitHub Pages

1. Fork or clone this repository
2. Go to your repository settings
3. Navigate to **Pages** section
4. Under "Source", select the `main` branch
5. Save and wait for deployment
6. Your addon will be available at: `https://YOUR-USERNAME.github.io/naruto-ocean-cut-stremio/manifest.json`

### Deploy to Other Hosts

You can deploy this to any static file hosting service:
- Netlify
- Vercel
- Cloudflare Pages
- Your own web server

Just upload the entire `naruto-ocean-cut-stremio` folder and make sure the manifest.json is accessible.

## File Structure

```
naruto-ocean-cut-stremio/
├── manifest.json              # Addon manifest
├── catalog/
│   └── series/
│       └── narutooc_catalog.json  # Catalog listing
├── meta/
│   └── series/
│       └── narutooc.json      # Series metadata with all episodes
├── stream/
│   └── series/
│       ├── naruto_0_1.json    # Stream info for each episode
│       ├── naruto_0_2.json
│       └── ... (95 files total)
└── scripts/
    └── generate-addon.js      # Script to regenerate addon files
```

## Updating the Addon

If you need to regenerate the addon files (e.g., after torrent updates):

```bash
cd naruto-ocean-cut-stremio
node scripts/generate-addon.js
```

This will regenerate all JSON files based on the torrent file list in the script.

## Credits

- **Naruto Ocean Cut** created by darkj6
- Original **Naruto** series by Masashi Kishimoto
- Addon structure inspired by the [One Pace Stremio Addon](https://github.com/au2001/onepace-stremio)
- Poster artwork from the [Naruto Ocean Cut Plex Posters collection](https://imgur.com/gallery/naruto-ocean-cut-plex-posters-NKBuSKX)

## Disclaimer

This addon only provides metadata and torrent information. It does not host any content. Users are responsible for ensuring they have the legal right to access the content through this addon.

## Support

If you encounter issues:
1. Make sure you have the torrent with active seeders
2. Check that your Stremio settings allow torrents
3. Verify the addon is properly installed
4. Try reinstalling the addon

## License

MIT License - See LICENSE file for details

---

**Note**: This is a fan project and is not affiliated with or endorsed by the creators of Naruto or the official rights holders.
