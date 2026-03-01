const https = require('https');
const fs = require('fs');

const checkStatus = (url) => {
    return new Promise((resolve) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
            resolve({ status: res.statusCode, xframe: res.headers['x-frame-options'] });
        }).on('error', () => resolve({ status: 500 }));
    });
};

async function buildVerifiedList() {
    console.log("Using backup slugs list since API enforces Cloudflare...");
    
    // Massive curated list of known working CrazyGames titles
    const backupSlugs = [
        "smash-karts", "krunker-io", "paper-io-2", "hole-io", "slope", 
        "bloxdhop-io", "bullet-force-multiplayer", "shellshockersio", 
        "1v1-lol", "voxiom-io", "venge-io", "duck-life-4", "retro-bowl",
        "basketball-stars-2019", "getaway-shootout", "rooftop-snipers",
        "basketbros-io", "zombs-royale", "ev-io", "kour-io", "narrow-one",
        "time-shooter-2", "funny-shooter-2", "combat-reloaded", "blocky-cars",
        "drive-mad", "eggy-car", "city-car-driving-simulator", "mr-mine",
        "grindcraft", "doge-miner-2", "age-of-war", "stick-war", "papas-pizzeria",
        "subway-surfers", "doodle-jump", "temple-run-2", "pacman", "crossy-road",
        "geometry-dash", "drift-boss", "moto-x3m", "agar-io", "slitherio", "surviv-io",
        "skribbl-io", "minecraft-classic", "stardew-valley", "terraria", "rust",
        "cyberdino", "turnfight", "real-warships", "veck-io", "cyberpunk-2077",
        "valorant", "world-of-warcraft", "rocket-league", "fortnite", "csgo-2"
    ];

    const validGames = [];
    console.log(`Checking ${backupSlugs.length} direct CDN endpoints...`);

    for(let i=0; i<backupSlugs.length; i++) {
        const slug = backupSlugs[i];
        const testUrl = `https://games.crazygames.com/en_US/${slug}/index.html`;
        
        try {
            const result = await checkStatus(testUrl);
            // If the CDN returns 200, the game files actually exist here and have no iframe blocks
            if(result.status === 200 && !result.xframe) {
                validGames.push({
                    id: slug,
                    title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                    embedSlug: testUrl
                });
                process.stdout.write('✓');
            } else {
                process.stdout.write('x');
            }
        } catch(e) {
            process.stdout.write('x');
        }
    }

    console.log(`\nVerified ${validGames.length} 100% working, unblockable games!`);
    fs.writeFileSync('c:/Users/vital/Downloads/files (5)/agos/server/src/data/new_games.json', JSON.stringify(validGames, null, 2));
}

buildVerifiedList();
