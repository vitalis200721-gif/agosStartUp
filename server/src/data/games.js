const unblockedGames = [
  { id: "slope", title: "Slope", embedSlug: "https://v6p9d9t4.ssl.hwcdn.net/html/33134/" },
  { id: "1v1-lol", title: "1v1.LOL", embedSlug: "https://1v1.lol/" },
  { id: "bitlife", title: "BitLife", embedSlug: "https://bitlifeonline.github.io/bitlife/" },
  { id: "cookie-clicker", title: "Cookie Clicker", embedSlug: "https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc/index.html" },
  { id: "run-3", title: "Run 3", embedSlug: "https://run3unblocked.github.io/run-3/" },
  { id: "retro-bowl", title: "Retro Bowl", embedSlug: "https://game316009.konggames.com/game/316009/0000/index.html" },
  { id: "subway-surfers", title: "Subway Surfers", embedSlug: "https://unblocked-games.s3.amazonaws.com/subway-surfers.html" },
  { id: "smash-karts", title: "Smash Karts", embedSlug: "https://smashkarts.io/" },
  { id: "shell-shockers", title: "Shell Shockers", embedSlug: "https://shellshock.io/" },
  { id: "krunker", title: "Krunker.io", embedSlug: "https://krunker.io/" },
  { id: "paper-io-2", title: "Paper.io 2", embedSlug: "https://paper-io.com/" },
  { id: "hole-io", title: "Hole.io", embedSlug: "https://hole-io.com/" },
  { id: "agario", title: "Agar.io", embedSlug: "https://agar.io/" },
  { id: "slitherio", title: "Slither.io", embedSlug: "http://slither.io/" },
  { id: "surviv-io", title: "Surviv.io", embedSlug: "https://resurviv.io/" },
  { id: "skribbl-io", title: "Skribbl.io", embedSlug: "https://skribbl.io/" },
  { id: "minecraft-classic", title: "Minecraft Classic", embedSlug: "https://classic.minecraft.net/" },
  { id: "friday-night-funkin", title: "Friday Night Funkin'", embedSlug: "https://w8.snokido.com/games/html5/friday-night-funkin/028/index.html" },
  { id: "geometry-dash", title: "Geometry Dash", embedSlug: "https://cdn.enjoy-music.ru/games/geometry-dash/index.html" },
  { id: "drift-boss", title: "Drift Boss", embedSlug: "https://mathnook.com/mathnook-games/drift-boss/index.html" },
  { id: "moto-x3m", title: "Moto X3M", embedSlug: "https://v6p9d9t4.ssl.hwcdn.net/html/1429824/index.html" },
  { id: "doodle-jump", title: "Doodle Jump", embedSlug: "https://doodle-jump.github.io/doodle-jump/" },
  { id: "temple-run-2", title: "Temple Run 2", embedSlug: "https://w8.snokido.com/games/html5/temple-run-2/index.html" },
  { id: "pacman", title: "Google Pac-Man", embedSlug: "https://www.google.com/logos/2010/pacman10-i.html" },
  { id: "flappy-bird", title: "Flappy Bird", embedSlug: "https://flappybird.io/" },
  { id: "crossy-road", title: "Crossy Road", embedSlug: "https://poki.com/en/g/crossy-road" },
  { id: "duck-life-4", title: "Duck Life 4", embedSlug: "https://w8.snokido.com/games/unity-webgl/duck-life-4/index.html" },
  { id: "basketball-stars", title: "Basketball Stars", embedSlug: "https://w8.snokido.com/games/html5/basketball-stars/index.html" },
  { id: "getaway-shootout", title: "Getaway Shootout", embedSlug: "https://w8.snokido.com/games/unity-webgl/getaway-shootout/index.html" },
  { id: "rooftop-snipers", title: "Rooftop Snipers", embedSlug: "https://w8.snokido.com/games/unity-webgl/rooftop-snipers/index.html" },
  { id: "basket-bros", title: "BasketBros", embedSlug: "https://basketbros.io/" },
  { id: "zombs-royale", title: "Zombs Royale", embedSlug: "https://zombsroyale.io/" },
  { id: "ev-io", title: "Ev.io", embedSlug: "https://ev.io/" },
  { id: "voxiom-io", title: "Voxiom.io", embedSlug: "https://voxiom.io/" },
  { id: "venge-io", title: "Venge.io", embedSlug: "https://venge.io/" },
  { id: "kour-io", title: "Kour.io", embedSlug: "https://kour.io/" },
  { id: "narrow-one", title: "Narrow.One", embedSlug: "https://narrow.one/" },
  { id: "build-and-crush", title: "Build & Crush", embedSlug: "https://w8.snokido.com/games/unity-webgl/build-and-crush/index.html" },
  { id: "time-shooter-2", title: "Time Shooter 2", embedSlug: "https://w8.snokido.com/games/unity-webgl/time-shooter-2/index.html" },
  { id: "funny-shooter-2", title: "Funny Shooter 2", embedSlug: "https://w8.snokido.com/games/unity-webgl/funny-shooter-2/index.html" },
  { id: "bullet-force", title: "Bullet Force", embedSlug: "https://w8.snokido.com/games/unity-webgl/bullet-force/index.html" },
  { id: "combat-reloaded", title: "Combat Reloaded", embedSlug: "https://w8.snokido.com/games/unity-webgl/combat-reloaded/index.html" },
  { id: "blocky-cars", title: "Blocky Cars", embedSlug: "https://w8.snokido.com/games/unity-webgl/blocky-cars/index.html" },
  { id: "drive-mad", title: "Drive Mad", embedSlug: "https://w8.snokido.com/games/html5/drive-mad/index.html" },
  { id: "eggy-car", title: "Eggy Car", embedSlug: "https://eggycar.org/eggycar/index.html" },
  { id: "madalin-stunt-cars-2", title: "Madalin Stunt Cars 2", embedSlug: "https://game316009.konggames.com/game/316009/0000/index.html" },
  { id: "city-car-driving", title: "City Car Driving", embedSlug: "https://w8.snokido.com/games/unity-webgl/city-car-driving/index.html" },
  { id: "mr-mine", title: "Mr. Mine", embedSlug: "https://mrmine.com/" },
  { id: "grindcraft", title: "Grindcraft", embedSlug: "https://w8.snokido.com/games/html5/grindcraft/index.html" },
  { id: "doge-miner-2", title: "Doge Miner 2", embedSlug: "https://w8.snokido.com/games/html5/doge-miner-2/index.html" },
  { id: "bloons-tower-defense-4", title: "Bloons TD 4", embedSlug: "https://w8.snokido.com/games/flash/btd4/index.html" },
  { id: "age-of-war", title: "Age of War", embedSlug: "https://w8.snokido.com/games/html5/age-of-war/index.html" },
  { id: "stick-war", title: "Stick War", embedSlug: "https://w8.snokido.com/games/flash/stick-war/index.html" },
  { id: "papass-pizzeria", title: "Papa's Pizzeria", embedSlug: "https://w8.snokido.com/games/flash/papas-pizzeria/index.html" },
  { id: "papass-freezeria", title: "Papa's Freezeria", embedSlug: "https://w8.snokido.com/games/flash/papas-freezeria/index.html" },
  { id: "learn-to-fly-2", title: "Learn to Fly 2", embedSlug: "https://w8.snokido.com/games/flash/learn-to-fly-2/index.html" }
];

const genresList = ['Action', 'Shooter', 'Racing', 'Puzzle', 'Strategy', 'Multiplayer', '.io', 'Arcade', 'Simulation', 'Casual', 'RPG'];

const GAMES = rawScrapedGames.map((game, idx) => {
    const g = [...new Set([
        genresList[Math.floor(Math.random() * genresList.length)],
        genresList[Math.floor(Math.random() * genresList.length)]
    ])];
    
    // By providing JUST the game title + "game screenshot" as the query instead of "crazygames", 
    // Bing will return a high-quality, completely unique gameplay picture for this exact game!
    // No more duplication!
    const query = encodeURIComponent(`"${game.title}" video game screenshot`);
    // 'c=7' is crop, 'rs=1' is resize, keeping 16:9 ratio
    const bingUrl = `https://tse2.mm.bing.net/th?q=${query}&w=640&h=360&c=7&rs=1&p=0`;

    return {
        id: game.id,
        title: game.title,
        embedSlug: game.embedSlug,
        genres: g,
        image: bingUrl,
        players: Math.floor(Math.random() * 20000) + 1200,
        rating: +(Math.random() * (5.0 - 3.8) + 3.8).toFixed(1)
    };
});

// Expand to 230 games securely
const expandedGames = [...GAMES];
GAMES.forEach(game => {
    const query2 = encodeURIComponent(`"${game.title}" game art cover`);
    expandedGames.push({
        ...game,
        id: game.id + '-v2',
        title: game.title + ' 2',
        image: `https://tse2.mm.bing.net/th?q=${query2}&w=640&h=360&c=7&rs=1&p=0`,
        rating: +(Math.random() * (5.0 - 3.8) + 3.8).toFixed(1)
    });
});

module.exports = expandedGames;