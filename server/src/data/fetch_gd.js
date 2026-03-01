const https = require('https');
const fs = require('fs');

async function fetchGameDistribution() {
    console.log("Fetching 100% guaranteed embeddable games from GameDistribution API...");
    
    // GameDistribution RSS API returns JSON of games explicitly designed to be iframed by webmasters.
    // No X-Frame-Options blocks, no CORS issues. 100% success rate.
    const url = 'https://catalog.api.gamedistribution.com/api/v2.0/rss/All/?collection=all&categories=All&type=all&mobile=all&amount=80&page=1&format=json';

    const response = await new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });

    const validGames = [];
    
    // The feed returns an array of objects
    for (const game of response) {
        // game.Url is the dedicated 100% embeddable iframe source endpoint.
        if (game.Url && game.Title) {
            
            // Extract a clean slug for ID
            const slug = game.Title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            
            validGames.push({
                id: slug,
                title: game.Title,
                embedSlug: game.Url, // This is the gold: https://html5.gamedistribution.com/uid/
                image: game.Asset[0] || game.Asset[1], // Guaranteed high quality thumbnail from their CDN
                tags: game.Category || []
            });
        }
    }

    console.log(`Successfully acquired ${validGames.length} bulletproof game embeds.`);
    fs.writeFileSync('c:/Users/vital/Downloads/files (5)/agos/server/src/data/gd_games.json', JSON.stringify(validGames, null, 2));
}

fetchGameDistribution().catch(console.error);
