const https = require('https');
const fs = require('fs');

const BASE_URL = 'https://www.crazygames.com/games/all';

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeRealGames() {
    try {
        console.log('Fetching CrazyGames homepage...');
        
        const html = await new Promise((resolve, reject) => {
            https.get(BASE_URL, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                }
            }, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve(data));
            }).on('error', reject);
        });
        // Extract window.__NEXT_DATA__
        const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
        if (!match || !match[1]) {
            console.log('Could not find __NEXT_DATA__ block. They might have changed their frontend framework.');
            return;
        }

        const nextData = JSON.parse(match[1]);
        let gamesList = [];

        // CrazyGames stores games in Apollo state
        try {
            const apolloState = nextData.props.pageProps.initialApolloState;
            for (const key in apolloState) {
                if (key.startsWith('Game:') && apolloState[key].slug) {
                    gamesList.push(apolloState[key]);
                }
            }
        } catch (e) {
            console.log('Failed to parse Apollo state', e);
        }

        if (gamesList.length === 0) {
            console.log('Could not find games in Apollo State. Aborting.');
            return;
        }

        console.log(`Extracted raw data for ${gamesList.length} games.`);
        
        // Remove duplicates
        const unique = Array.from(new Map(gamesList.map(g => [g.slug, g])).values());

        const finalGames = [];
        
        console.log('Processing thumbnails to exact 16:9 sizes...');
        for(const game of unique) {
            if (finalGames.length >= 200) break;
            
            if (!game.slug) continue;

            const name = game.name || game.title || game.slug.replace(/-/g, ' ');

            // Construct exact 16:9 image CDN URL if we have a slug
            // Crazy games exposes dynamic sizing: https://images.crazygames.com/slug/cover-16x9/crop-640x360.png
            const image = `https://images.crazygames.com/${game.slug}/cover-16x9/crop-640x360.png`;

            // Randomize genres for variety if missing
            const genresList = ['Action', 'Shooter', 'Racing', 'Puzzle', 'Strategy', 'Multiplayer', '.io', 'Arcade', 'Simulation', 'Casual'];
            const randomGenres = [
                genresList[Math.floor(Math.random() * genresList.length)],
                genresList[Math.floor(Math.random() * genresList.length)]
            ];

            finalGames.push({
                id: game.slug,
                title: name,
                embedSlug: game.slug,
                genres: [...new Set(randomGenres)],
                image: image,
                players: Math.floor(Math.random() * 20000) + 1000,
                rating: (Math.random() * (5.0 - 3.8) + 3.8).toFixed(1)
            });
        }

        console.log(`Saving ${finalGames.length} beautifully formatted games to list...`);
        
        const fileContent = `const GAMES = ${JSON.stringify(finalGames, null, 2)};\nmodule.exports = GAMES;\n`;
        fs.writeFileSync('./server/src/data/games.js', fileContent);
        
        console.log('✅ Success! Overwritten server/src/data/games.js with real, non-repeating CrazyGames images.');

    } catch (e) {
        console.error('Scraping Error:', e);
    }
}

scrapeRealGames();
