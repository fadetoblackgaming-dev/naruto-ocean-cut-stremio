const fs = require('fs');
const path = require('path');

// Torrent info
const TORRENT_HASH = 'E0C38EDE05E555D337E7D534F4EAAEBC773BF913'; // Uppercase for better compatibility
const UPLOAD_DATE = '2022-04-13T00:00:00.000Z';

// Episode to season mapping based on episode numbers
function getSeasonForEpisode(episodeNum, isEpilogue = false, isSpecial = false) {
  if (isSpecial) return 0; // All specials go to Season 0
  if (isEpilogue) return 20; // Epilogue episodes go to Season 20
  
  // Regular episode mapping
  if (episodeNum >= 1 && episodeNum <= 5) return 1;    // Land of Waves
  if (episodeNum >= 6 && episodeNum <= 17) return 2;   // Chunin Exams
  if (episodeNum >= 18 && episodeNum <= 21) return 3;  // Search for Hope
  if (episodeNum >= 22 && episodeNum <= 28) return 4;  // Retrieval Mission
  if (episodeNum >= 29 && episodeNum <= 34) return 5;  // Kazekage Rescue
  if (episodeNum >= 35 && episodeNum <= 38) return 6;  // Tenchi Bridge Investigation
  if (episodeNum >= 39 && episodeNum <= 43) return 7;  // Akatsuki Suppression
  if (episodeNum >= 44 && episodeNum <= 47) return 8;  // Hunt for the Traitor
  if (episodeNum >= 48 && episodeNum <= 49) return 9;  // Jiraiya the Gallant
  if (episodeNum >= 50 && episodeNum <= 51) return 10; // Unleashed (OPTIONAL)
  if (episodeNum >= 52 && episodeNum <= 56) return 11; // Pain
  if (episodeNum >= 57 && episodeNum <= 62) return 12; // Kage Summit
  if (episodeNum >= 63 && episodeNum <= 65) return 13; // Island of Purification
  if (episodeNum >= 66 && episodeNum <= 72) return 14; // The War
  if (episodeNum >= 73 && episodeNum <= 74) return 15; // Naruto's Counterattack
  if (episodeNum >= 75 && episodeNum <= 79) return 16; // Worst Case Scenario
  if (episodeNum >= 80 && episodeNum <= 86) return 17; // Hell
  if (episodeNum >= 87 && episodeNum <= 88) return 18; // Realm of Infinity
  if (episodeNum >= 89 && episodeNum <= 91) return 19; // Finale
  
  return 0; // Default to Season 0 for anything else
}

// File list from the torrent (in order as they appear)
const fileList = [
  { index: 0, path: 'Season 13 - The War/Naruto Episode 70 - Golden Bonds.mp4' },
  { index: 1, path: 'Help_FAQ_Useful Info_WIP/Changelog.txt' }, // Skip non-video
  { index: 2, path: 'Season 0 - Land of Waves/Naruto Episode 1 - Enter Naruto Uzumaki!.mp4' },
  { index: 3, path: 'Season 0 - Land of Waves/Naruto Episode 2 - Journey To The Land Of Waves!.mp4' },
  { index: 4, path: 'Season 0 - Land of Waves/Naruto Episode 3 - The Forest of Chakra.mp4' },
  { index: 5, path: 'Season 0 - Land of Waves/Naruto Episode 4 - Hakus Secret Jutsu!.mp4' },
  { index: 6, path: 'Season 0 - Land of Waves/Naruto Episode 5 - White Past, Hidden Ambition.mp4' },
  { index: 7, path: 'Season 0 - Land of Waves/SPECIAL #1 - Inari\'s Test of Courage.mp4' },
  { index: 8, path: 'Season 1 - Chunin Exams/Naruto Episode 6 - A new Chapter begins!.mp4' },
  { index: 9, path: 'Season 1 - Chunin Exams/Naruto Episode 7 - Genin Takedown!.mp4' },
  { index: 10, path: 'Season 1 - Chunin Exams/Naruto Episode 8 - The Forest of Death.mp4' },
  { index: 11, path: 'Season 1 - Chunin Exams/Naruto Episode 9 - Sakura Blossoms, Sasuke Awakens!.mp4' },
  { index: 12, path: 'Season 1 - Chunin Exams/Naruto Episode 10 - Preliminary Persistence.m4v' },
  { index: 13, path: 'Season 1 - Chunin Exams/Naruto Episode 11 - Top Dog.mp4' },
  { index: 14, path: 'Season 1 - Chunin Exams/Naruto Episode 12 - Splendid Ninja.m4v' },
  { index: 15, path: 'Season 1 - Chunin Exams/Naruto Episode 13 - Naruto\'s Hardest Training Yet!.m4v' },
  { index: 16, path: 'Season 1 - Chunin Exams/Naruto Episode 14 - The Final Rounds Begin!.m4v' },
  { index: 17, path: 'Season 1 - Chunin Exams/Naruto Episode 15 - Dancing Leaf, Squirming Sand!.m4v' },
  { index: 18, path: 'Season 1 - Chunin Exams/Naruto Episode 16 - Zero Hour!.m4v' },
  { index: 19, path: 'Season 1 - Chunin Exams/Naruto Episode 17 - Beyond Darkness And Light.m4v' },
  { index: 20, path: 'Season 1 - Chunin Exams/Special #2 - Kakashi\'s Face!-1.m4v' },
  { index: 21, path: 'Season 2 - Search for Hope/Naruto Episode 18 - The Morning Mist-1.m4v' },
  { index: 22, path: 'Season 2 - Search for Hope/Naruto Episode 19 - A New Training Begins!.mp4' },
  { index: 23, path: 'Season 2 - Search for Hope/Naruto Episode 20 - The Necklace of Death!.mp4' },
  { index: 24, path: 'Season 2 - Search for Hope/Naruto Episode 21 - Breakdown!-1.m4v' },
  { index: 25, path: 'Season 3 - Retrieval Mission/Naruto Episode 22 - Patients-1.m4v' },
  { index: 26, path: 'Season 3 - Retrieval Mission/Naruto Episode 23 - Comrades.m4v' },
  { index: 27, path: 'Season 3 - Retrieval Mission/Naruto Episode 24 - Opponents-1.m4v' },
  { index: 28, path: 'Season 3 - Retrieval Mission/Naruto Episode 25 - Warriors-1.m4v' },
  { index: 29, path: 'Season 3 - Retrieval Mission/Naruto Episode 26 - Allies.mp4' },
  { index: 30, path: 'Season 3 - Retrieval Mission/Naruto Episode 27 - Brothers.mp4' },
  { index: 31, path: 'Season 3 - Retrieval Mission/Naruto Episode 28 - Friends-1.m4v' },
  { index: 32, path: 'Season 3 - Retrieval Mission/SPECIAL #3 - Boy on the Battlefield.mp4' },
  { index: 33, path: 'Season 4 - Kazekage Rescue/Naruto Episode 29 - Homecoming.mp4' },
  { index: 34, path: 'Season 4 - Kazekage Rescue/Naruto Episode 30 - Team Kakashi, Deployed.mp4' },
  { index: 35, path: 'Season 4 - Kazekage Rescue/Naruto Episode 31 - A Meeting with Destiny.mp4' },
  { index: 36, path: 'Season 4 - Kazekage Rescue/Naruto Episode 32 - The Secret of Jinchuriki.mp4' },
  { index: 37, path: 'Season 4 - Kazekage Rescue/Naruto Episode 33 - Kunoichi vs The Puppetmaster.mp4' },
  { index: 38, path: 'Season 4 - Kazekage Rescue/Naruto Episode 34 - Legacy.mp4' },
  { index: 39, path: 'Season 5 - Tenchi Bridge Investigation/Naruto Episode 35 - The New Target.mp4' },
  { index: 40, path: 'Season 5 - Tenchi Bridge Investigation/Naruto Episode 36 - The Tenchi Bridge.mp4' },
  { index: 41, path: 'Season 5 - Tenchi Bridge Investigation/Naruto Episode 37 - Blank Page.mp4' },
  { index: 42, path: 'Season 5 - Tenchi Bridge Investigation/Naruto Episode 38 - Reunion.mp4' },
  { index: 43, path: 'Season 6 - Akatsuki Suppression/Naruto Episode 39 - The Quietly Approaching Threat.mp4' },
  { index: 44, path: 'Season 6 - Akatsuki Suppression/Naruto Episode 40 - Akatsuki Investigation.mp4' },
  { index: 45, path: 'Season 6 - Akatsuki Suppression/Naruto Episode 41 - Climbing Silver-1.m4v' },
  { index: 46, path: 'Season 6 - Akatsuki Suppression/Naruto Episode 42 - Those called Immortal.mp4' },
  { index: 47, path: 'Season 6 - Akatsuki Suppression/Naruto Episode 43 - The Price of Power.mp4' },
  { index: 48, path: 'Season 7 - Hunt for the Traitor/Naruto Episode 44 - The Serpent\'s Pupil.m4v' },
  { index: 49, path: 'Season 7 - Hunt for the Traitor/Naruto Episode 45 - The Hunt.m4v' },
  { index: 50, path: 'Season 7 - Hunt for the Traitor/Naruto Episode 46 - The Black Flames of Brotherhood.mp4' },
  { index: 51, path: 'Season 7 - Hunt for the Traitor/Naruto Episode 47 - The Truth.mp4' },
  { index: 52, path: 'Season 8 - Jiraiya the Gallant/Naruto Episode 48 - Tales of a Gutsy Ninja.mp4' },
  { index: 53, path: 'Season 8 - Jiraiya the Gallant/Naruto Episode 49 - Mystery Under The Rainclouds 1-1.m4v' },
  { index: 54, path: 'Season 9 - Unleashed (OPTIONAL)/Naruto Episode 50 - Wanderer.m4v' },
  { index: 55, path: 'Season 9 - Unleashed (OPTIONAL)/Naruto Episode 51 - Master.mp4' },
  { index: 56, path: 'Season 10 - Pain/Naruto Episode 52 - Somber News.mp4' },
  { index: 57, path: 'Season 10 - Pain/Naruto Episode 53 - Escalation.m4v' },
  { index: 58, path: 'Season 10 - Pain/Naruto Episode 54 - Assault-1.m4v' },
  { index: 59, path: 'Season 10 - Pain/Naruto Episode 55 - The Hero of the Leaf_1.mp4' },
  { index: 60, path: 'Season 10 - Pain/Naruto Episode 56 - The Tale Of Naruto Uzumaki-1.m4v' },
  { index: 61, path: 'Season 11 - Kage Summit/Naruto Episode 57 - Rising Tensions.mp4' },
  { index: 62, path: 'Season 11 - Kage Summit/Naruto Episode 58 - The Summit.m4v' },
  { index: 63, path: 'Season 11 - Kage Summit/Naruto Episode 59 - Racing Minds.mp4' },
  { index: 64, path: 'Season 11 - Kage Summit/Naruto Episode 60 - The Power of the Elder.mp4' },
  { index: 65, path: 'Season 11 - Kage Summit/Naruto Episode 61 - High-Level Shinobi.mp4' },
  { index: 66, path: 'Season 11 - Kage Summit/Naruto Episode 62 - Calm before the Storm.mp4' },
  { index: 67, path: 'Season 12 - Island of Purification /Naruto Episode 63 - The Waterfall of Truth.mp4' },
  { index: 68, path: 'Season 12 - Island of Purification /Naruto Episode 64 - The Nine-Tailed Fox.m4v' },
  { index: 69, path: 'Season 12 - Island of Purification /Naruto Episode 65 - The Shark and the Angel.mp4' },
  { index: 70, path: 'Season 13 - The War/Naruto Episode 66 - Alliance.mp4' },
  { index: 71, path: 'Season 13 - The War/Naruto Episode 67 - War!.mp4' },
  { index: 72, path: 'Season 13 - The War/Naruto Episode 68 - The First Enemy.mp4' },
  { index: 73, path: 'Season 13 - The War/Naruto Episode 69 - Battle On The Beach-1.m4v' },
  { index: 74, path: 'README.txt' }, // Skip
  { index: 75, path: 'Season 13 - The War/Naruto Episode 71 - Nightfall-1.m4v' },
  { index: 76, path: 'Season 13 - The War/Naruto Episode 72 - Company 3.mp4' },
  { index: 77, path: 'Season 14 - Naruto\'s Counterattack/Naruto Episode 73 - The Acknowledged One-1.m4v' },
  { index: 78, path: 'Season 14 - Naruto\'s Counterattack/Naruto Episode 74 - Reinforcements!-1.m4v' },
  { index: 79, path: 'Season 15 - Worst Case Scenario/Naruto Episode 75 - Madara Uchiha.m4v' },
  { index: 80, path: 'Season 15 - Worst Case Scenario/Naruto Episode 76 - Tailed Beasts.m4v' },
  { index: 81, path: 'Season 15 - Worst Case Scenario/Naruto Episode 77 - Eyes That See in the Dark.mp4' },
  { index: 82, path: 'Season 15 - Worst Case Scenario/Naruto Episode 78 - I Will Love You, Always.m4v' },
  { index: 83, path: 'Season 15 - Worst Case Scenario/Naruto Episode 79 - Unmasked.mp4' },
  { index: 84, path: 'Season 16 - Hell/Naruto Episode 80 - Hell.m4v' },
  { index: 85, path: 'Season 16 - Hell/Naruto Episode 81 - Allied Resolve.m4v' },
  { index: 86, path: 'Season 16 - Hell/Naruto Episode 82 - The All-Knowing.m4v' },
  { index: 87, path: 'Season 16 - Hell/Naruto Episode 83 - The New Sannin.mp4' },
  { index: 88, path: 'Season 16 - Hell/Naruto Episode 84 - Kakashi\'s Phantom.m4v' },
  { index: 89, path: 'Season 16 - Hell/Naruto Episode 85 - The Heart.m4v' },
  { index: 90, path: 'Season 16 - Hell/Naruto Episode 86 - A True Ending.mp4' },
  { index: 91, path: 'Season 17 - Realm of Infinity /Naruto Episode 87 - The Traitor and the Beast.mp4' },
  { index: 92, path: 'Season 17 - Realm of Infinity /Naruto Episode 88 - World Of Dreams.m4v' },
  { index: 93, path: 'Season 18 - Finale/Naruto Episode 89 - She, Of The Beginning-1.m4v' },
  { index: 94, path: 'Season 18 - Finale/Naruto Episode 90 - Those Who Inherit The Future-1.m4v' },
  { index: 95, path: 'Season 18 - Finale/Naruto Episode 91 - Ninja-1.m4v' },
  { index: 96, path: 'Season 18 - Finale/Special #4 - Boyhood-1.m4v' },
  { index: 97, path: 'Season 19 - Epilogue (WIP)/Naruto Epilogue Episode 1 - The Strategist-1.m4v' },
  { index: 98, path: 'Season 19 - Epilogue (WIP)/Naruto Epilogue Episode 2 - The Last-1.m4v' },
  { index: 99, path: 'Season 19 - Epilogue (WIP)/Naruto Epilogue Episode 3 - The Wanderer-1.m4v' },
  { index: 100, path: 'Season 19 - Epilogue (WIP)/Naruto The Final Episode-1.m4v' },
  { index: 101, path: 'Special Season - Kakashi\'s Story/Kakashi\'s Story Episode 1 – A Mask That Hides The Heart-1.m4v' },
  { index: 102, path: 'Special Season - Kakashi\'s Story/Kakashi\'s Story Episode 2 - Jonin Leader-1.m4v' },
  { index: 103, path: 'Special Season - Kakashi\'s Story/When to watch.txt' }, // Skip
];

// Parse episode information
function parseEpisode(filePath, fileIndex) {
  // Skip non-video files
  if (!filePath.endsWith('.mp4') && !filePath.endsWith('.m4v')) {
    return null;
  }

  const match = filePath.match(/(?:Naruto (?:Episode|Epilogue Episode)|SPECIAL #|Kakashi's Story Episode) (\d+|#\d+) - (.+?)(?:-\d+)?\.(?:mp4|m4v)/);
  
  if (!match) return null;

  let episodeNum = match[1];
  let title = match[2].trim();
  
  // Detect episode type
  const isEpilogue = filePath.includes('Epilogue');
  const isSpecial = filePath.includes('SPECIAL #') || filePath.includes('Kakashi\'s Story');
  
  // Handle special episodes
  if (episodeNum.startsWith('#')) {
    episodeNum = episodeNum.substring(1);
  }

  // Determine season using the mapping function
  const season = getSeasonForEpisode(parseInt(episodeNum), isEpilogue, isSpecial);
  
  const id = `naruto_${season}_${episodeNum}`;

  return {
    id,
    season,
    episode: parseInt(episodeNum),
    title,
    fileIndex,
    released: UPLOAD_DATE
  };
}

// Process all files
const episodes = fileList
  .map(f => parseEpisode(f.path, f.index))
  .filter(e => e !== null)
  .sort((a, b) => {
    if (a.season !== b.season) return a.season - b.season;
    return a.episode - b.episode;
  });

console.log(`Parsed ${episodes.length} episodes`);

// Generate manifest.json
const manifest = {
  id: 'com.narutooc.stremio',
  version: '1.0.0',
  name: 'Naruto Ocean Cut',
  description: 'Fan-edited version of Naruto (2002) with no filler, streamlined pacing, and improved flow. English dub.',
  logo: 'https://i.imgur.com/hPBW2mU.png',
  resources: [
    'catalog',
    {
      name: 'meta',
      types: ['series']
    },
    'stream'
  ],
  types: ['series'],
  catalogs: [
    {
      type: 'series',
      id: 'narutooc_catalog',
      name: 'Naruto Ocean Cut',
      extra: [
        {
          name: 'search',
          isRequired: false
        }
      ]
    }
  ]
};

fs.writeFileSync(
  path.join(__dirname, '../manifest.json'),
  JSON.stringify(manifest, null, 2)
);
console.log('✓ Generated manifest.json');

// Generate catalog
const catalog = {
  metas: [
    {
      type: 'series',
      id: 'narutooc',
      name: 'Naruto Ocean Cut',
      poster: 'https://i.imgur.com/hPBW2mU.png',
      genres: ['Animation', 'Action', 'Adventure', 'Fantasy'],
      description: 'Naruto Ocean Cut is a fan-edited version of the original Naruto anime series that removes filler content, excessive flashbacks, and unnecessary padding for a streamlined viewing experience.'
    }
  ]
};

fs.writeFileSync(
  path.join(__dirname, '../catalog/series/narutooc_catalog.json'),
  JSON.stringify(catalog, null, 2)
);
console.log('✓ Generated catalog');

// Generate meta with all episodes
const videos = episodes.map(ep => ({
  season: ep.season,
  episode: ep.episode,
  id: ep.id,
  title: ep.title,
  released: ep.released,
  overview: `Episode ${ep.episode} of Naruto Ocean Cut - ${ep.title}`
}));

const meta = {
  meta: {
    id: 'narutooc',
    type: 'series',
    name: 'Naruto Ocean Cut',
    poster: 'https://i.imgur.com/hPBW2mU.png',
    background: 'https://i.imgur.com/YJ8k5Ku.png',
    genres: ['Animation', 'Action', 'Adventure', 'Fantasy'],
    description: 'Naruto Ocean Cut is a fan-edited version of the original Naruto anime series that removes filler content, excessive flashbacks, and unnecessary padding for a streamlined viewing experience. Features English dub audio with re-edited pacing to match the manga.',
    videos
  }
};

fs.writeFileSync(
  path.join(__dirname, '../meta/series/narutooc.json'),
  JSON.stringify(meta, null, 2)
);
console.log('✓ Generated meta with', videos.length, 'episodes');

// Generate stream files for each episode
const streamDir = path.join(__dirname, '../stream/series');
if (!fs.existsSync(streamDir)) {
  fs.mkdirSync(streamDir, { recursive: true });
}

episodes.forEach(ep => {
  const stream = {
    streams: [
      {
        infoHash: TORRENT_HASH,
        fileIdx: ep.fileIndex,
        title: `🌊 Ocean Cut\n📦 Torrent`,
        sources: [
          'tracker:udp://tracker.opentrackr.org:1337/announce',
          'dht:' + TORRENT_HASH
        ]
      }
    ]
  };

  fs.writeFileSync(
    path.join(streamDir, `${ep.id}.json`),
    JSON.stringify(stream, null, 2)
  );
});

console.log(`✓ Generated ${episodes.length} stream files`);
console.log('\n✅ Addon generation complete!');
console.log(`\nTo deploy: Host the naruto-ocean-cut-stremio folder on GitHub Pages or any static host.`);
console.log(`Manifest URL will be: https://yourdomain.com/manifest.json`);
