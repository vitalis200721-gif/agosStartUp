// Static game data — in production, migrate to database

const GAMES = [
  {
    "id": "smash-karts",
    "title": "Smash Karts",
    "embedSlug": "smash-karts",
    "genres": [
      "Racing",
      "Multiplayer",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Smash%20Karts%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 4740,
    "rating": 3.7
  },
  {
    "id": "shell-shockers",
    "title": "Shell Shockers",
    "embedSlug": "shellshockersio",
    "genres": [
      "Shooter",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Shell%20Shockers%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 17636,
    "rating": 4.2
  },
  {
    "id": "ev-io",
    "title": "Ev.io",
    "embedSlug": "ev-io",
    "genres": [
      "Shooter",
      "Multiplayer",
      ".io"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Ev.io%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 15999,
    "rating": 3.9
  },
  {
    "id": "bloxdhop-io",
    "title": "Bloxd.io",
    "embedSlug": "bloxdhop-io",
    "genres": [
      "Action",
      "Multiplayer",
      "Building"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Bloxd.io%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 9278,
    "rating": 4.6
  },
  {
    "id": "buildnow-gg",
    "title": "BuildNow GG",
    "embedSlug": "buildnow-gg",
    "genres": [
      "Shooter",
      "Building"
    ],
    "image": "https://tse2.mm.bing.net/th?q=BuildNow%20GG%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 17122,
    "rating": 4.4
  },
  {
    "id": "bullet-force",
    "title": "Bullet Force",
    "embedSlug": "bullet-force-multiplayer",
    "genres": [
      "Shooter",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Bullet%20Force%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 7242,
    "rating": 4.9
  },
  {
    "id": "rocket-bot-royale",
    "title": "Rocket Bot Royale",
    "embedSlug": "rocket-bot-royale",
    "genres": [
      "Shooter",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Rocket%20Bot%20Royale%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 11692,
    "rating": 4.9
  },
  {
    "id": "krunker",
    "title": "Krunker",
    "embedSlug": "krunker-io",
    "genres": [
      "Shooter",
      "Multiplayer",
      ".io"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Krunker%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 2823,
    "rating": 4.5
  },
  {
    "id": "voxiom-io",
    "title": "Voxiom.io",
    "embedSlug": "voxiom-io",
    "genres": [
      "Shooter",
      "Multiplayer",
      "Building"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Voxiom.io%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 18320,
    "rating": 4.2
  },
  {
    "id": "forward-assault",
    "title": "Forward Assault",
    "embedSlug": "forward-assault-remix",
    "genres": [
      "Shooter",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Forward%20Assault%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 8627,
    "rating": 3.7
  },
  {
    "id": "crazy-roll-3d",
    "title": "Crazy Roll 3D",
    "embedSlug": "crazy-roll-3d",
    "genres": [
      "Platformer",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Crazy%20Roll%203D%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 14622,
    "rating": 4
  },
  {
    "id": "slope",
    "title": "Slope",
    "embedSlug": "slope",
    "genres": [
      "Arcade",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Slope%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 8436,
    "rating": 4.8
  },
  {
    "id": "tunnel-rush",
    "title": "Tunnel Rush",
    "embedSlug": "tunnel-rush",
    "genres": [
      "Arcade",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Tunnel%20Rush%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 10604,
    "rating": 4.6
  },
  {
    "id": "color-tunnel",
    "title": "Color Tunnel",
    "embedSlug": "color-tunnel",
    "genres": [
      "Arcade",
      "Puzzle"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Color%20Tunnel%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 9541,
    "rating": 3.6
  },
  {
    "id": "traffic-rider",
    "title": "Traffic Rider",
    "embedSlug": "traffic-rider",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Traffic%20Rider%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 10156,
    "rating": 4.1
  },
  {
    "id": "drift-hunters",
    "title": "Drift Hunters",
    "embedSlug": "drift-hunters",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Drift%20Hunters%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 13606,
    "rating": 4.3
  },
  {
    "id": "polytrack",
    "title": "PolyTrack",
    "embedSlug": "polytrack",
    "genres": [
      "Racing",
      "Building",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=PolyTrack%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 17947,
    "rating": 4.3
  },
  {
    "id": "basket-random",
    "title": "Basket Random",
    "embedSlug": "basket-random",
    "genres": [
      "Sports",
      "Casual",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Basket%20Random%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 4687,
    "rating": 4.6
  },
  {
    "id": "soccer-random",
    "title": "Soccer Random",
    "embedSlug": "soccer-random",
    "genres": [
      "Sports",
      "Casual",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Soccer%20Random%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 6148,
    "rating": 3.5
  },
  {
    "id": "volley-random",
    "title": "Volley Random",
    "embedSlug": "volley-random",
    "genres": [
      "Sports",
      "Casual",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Volley%20Random%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 9044,
    "rating": 4.7
  },
  {
    "id": "basketball-stars",
    "title": "Basketball Stars",
    "embedSlug": "basketball-stars-2019",
    "genres": [
      "Sports",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Basketball%20Stars%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 18497,
    "rating": 4.1
  },
  {
    "id": "penalty-shooters-2",
    "title": "Penalty Shooters 2",
    "embedSlug": "penalty-shooters-2",
    "genres": [
      "Sports",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Penalty%20Shooters%202%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 1687,
    "rating": 4.6
  },
  {
    "id": "table-tennis",
    "title": "Table Tennis World Tour",
    "embedSlug": "table-tennis-world-tour",
    "genres": [
      "Sports",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Table%20Tennis%20World%20Tour%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 15718,
    "rating": 4.1
  },
  {
    "id": "8-ball-billiards-classic",
    "title": "8 Ball Billiards Classic",
    "embedSlug": "8-ball-billiards-classic",
    "genres": [
      "Sports",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=8%20Ball%20Billiards%20Classic%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 20811,
    "rating": 4.3
  },
  {
    "id": "chess-free",
    "title": "Master Chess",
    "embedSlug": "master-chess",
    "genres": [
      "Board",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Master%20Chess%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 16721,
    "rating": 4.9
  },
  {
    "id": "checkers",
    "title": "Master Checkers",
    "embedSlug": "master-checkers",
    "genres": [
      "Board",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Master%20Checkers%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 20529,
    "rating": 4.4
  },
  {
    "id": "uno-online",
    "title": "Ono Card Game",
    "embedSlug": "ono-card-game",
    "genres": [
      "Card",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Ono%20Card%20Game%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 4198,
    "rating": 3.6
  },
  {
    "id": "ludo-hero",
    "title": "Ludo Hero",
    "embedSlug": "ludo-hero",
    "genres": [
      "Board",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Ludo%20Hero%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 3072,
    "rating": 4.9
  },
  {
    "id": "spider-solitaire",
    "title": "Spider Solitaire",
    "embedSlug": "spider-solitaire",
    "genres": [
      "Card",
      "Puzzle"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Spider%20Solitaire%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 8061,
    "rating": 4.2
  },
  {
    "id": "mahjongg-solitaire",
    "title": "Mahjongg Solitaire",
    "embedSlug": "mahjongg-solitaire",
    "genres": [
      "Puzzle",
      "Card"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Mahjongg%20Solitaire%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 6547,
    "rating": 4.3
  },
  {
    "id": "words-of-wonders",
    "title": "Words of Wonders",
    "embedSlug": "words-of-wonders",
    "genres": [
      "Word",
      "Puzzle"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Words%20of%20Wonders%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 11394,
    "rating": 4.5
  },
  {
    "id": "wordle",
    "title": "Wordle",
    "embedSlug": "wordle",
    "genres": [
      "Word",
      "Puzzle"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Wordle%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 7803,
    "rating": 5
  },
  {
    "id": "2048",
    "title": "2048",
    "embedSlug": "2048",
    "genres": [
      "Puzzle",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=2048%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 10335,
    "rating": 4.9
  },
  {
    "id": "cubes-2048",
    "title": "Cubes 2048.io",
    "embedSlug": "cubes-2048-io",
    "genres": [
      "Puzzle",
      ".io",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Cubes%202048.io%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 14959,
    "rating": 4.1
  },
  {
    "id": "flappy-bird",
    "title": "Flappy Bird",
    "embedSlug": "flappy-bird",
    "genres": [
      "Arcade",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Flappy%20Bird%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 11716,
    "rating": 3.7
  },
  {
    "id": "helix-jump",
    "title": "Helix Jump",
    "embedSlug": "helix-jump",
    "genres": [
      "Arcade",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Helix%20Jump%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 11198,
    "rating": 4.9
  },
  {
    "id": "temple-run-2",
    "title": "Temple Run 2",
    "embedSlug": "temple-run-2",
    "genres": [
      "Arcade",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Temple%20Run%202%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 1915,
    "rating": 4.6
  },
  {
    "id": "subway-surfers",
    "title": "Subway Surfers",
    "embedSlug": "subway-surfers",
    "genres": [
      "Arcade",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Subway%20Surfers%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 20205,
    "rating": 4
  },
  {
    "id": "geometry-dash",
    "title": "Geometry Dash",
    "embedSlug": "geometry-dash-online",
    "genres": [
      "Platformer",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Geometry%20Dash%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 19513,
    "rating": 4.7
  },
  {
    "id": "papa-pizzeria",
    "title": "Papa's Pizzeria",
    "embedSlug": "papas-pizzeria",
    "genres": [
      "Simulation",
      "Casual",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Papa's%20Pizzeria%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 3672,
    "rating": 4.4
  },
  {
    "id": "papa-freezeria",
    "title": "Papa's Freezeria",
    "embedSlug": "papas-freezeria",
    "genres": [
      "Simulation",
      "Casual",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Papa's%20Freezeria%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 3747,
    "rating": 4.5
  },
  {
    "id": "papa-burgeria",
    "title": "Papa's Burgeria",
    "embedSlug": "papas-burgeria",
    "genres": [
      "Simulation",
      "Casual",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Papa's%20Burgeria%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 19191,
    "rating": 3.5
  },
  {
    "id": "papa-scooperia",
    "title": "Papa's Scooperia",
    "embedSlug": "papa-s-scooperia",
    "genres": [
      "Simulation",
      "Casual",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Papa's%20Scooperia%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 6130,
    "rating": 3.9
  },
  {
    "id": "capybara-clicker",
    "title": "Capybara Clicker",
    "embedSlug": "capybara-clicker",
    "genres": [
      "Idle",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Capybara%20Clicker%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 15734,
    "rating": 4
  },
  {
    "id": "doge-miner-2",
    "title": "Doge Miner 2",
    "embedSlug": "doge-miner-2",
    "genres": [
      "Idle",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Doge%20Miner%202%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 8961,
    "rating": 4.5
  },
  {
    "id": "clicker-heroes",
    "title": "Clicker Heroes",
    "embedSlug": "clicker-heroes",
    "genres": [
      "Idle",
      "RPG"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Clicker%20Heroes%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 5281,
    "rating": 4.1
  },
  {
    "id": "cookie-clicker",
    "title": "Cookie Clicker",
    "embedSlug": "cookie-clicker",
    "genres": [
      "Idle",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Cookie%20Clicker%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 8096,
    "rating": 4.1
  },
  {
    "id": "idle-breakout",
    "title": "Idle Breakout",
    "embedSlug": "idle-breakout",
    "genres": [
      "Idle",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Idle%20Breakout%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 20282,
    "rating": 3.9
  },
  {
    "id": "babel-tower",
    "title": "Babel Tower",
    "embedSlug": "babel-tower",
    "genres": [
      "Idle",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Babel%20Tower%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 13079,
    "rating": 4.1
  },
  {
    "id": "farm-merge-valley",
    "title": "Farm Merge Valley",
    "embedSlug": "farm-merge-valley",
    "genres": [
      "Simulation",
      "Puzzle"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Farm%20Merge%20Valley%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 17982,
    "rating": 4.3
  },
  {
    "id": "duck-life-4",
    "title": "Duck Life 4",
    "embedSlug": "duck-life-4",
    "genres": [
      "RPG",
      "Action",
      "Sports"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Duck%20Life%204%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 21177,
    "rating": 4.5
  },
  {
    "id": "bitlife",
    "title": "BitLife - Life Simulator",
    "embedSlug": "bitlife-life-simulator",
    "genres": [
      "Simulation",
      "Casual",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=BitLife%20-%20Life%20Simulator%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 3860,
    "rating": 4.3
  },
  {
    "id": "sandbox-city",
    "title": "Sandbox City",
    "embedSlug": "sandbox-city---cars-zombies-ragdolls",
    "genres": [
      "Building",
      "Action",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Sandbox%20City%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 9565,
    "rating": 4.7
  },
  {
    "id": "granny",
    "title": "Granny",
    "embedSlug": "granny",
    "genres": [
      "Horror",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Granny%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 3769,
    "rating": 4.6
  },
  {
    "id": "fnaf",
    "title": "Five Nights at Freddy's",
    "embedSlug": "five-nights-at-freddys",
    "genres": [
      "Horror",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Five%20Nights%20at%20Freddy's%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 16991,
    "rating": 3.7
  },
  {
    "id": "fnaf-2",
    "title": "Five Nights at Freddy's 2",
    "embedSlug": "five-nights-at-freddys-2",
    "genres": [
      "Horror",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Five%20Nights%20at%20Freddy's%202%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 17035,
    "rating": 3.8
  },
  {
    "id": "stickman-hook",
    "title": "Stickman Hook",
    "embedSlug": "stickman-hook",
    "genres": [
      "Platformer",
      "Arcade",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Stickman%20Hook%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 14568,
    "rating": 4.2
  },
  {
    "id": "vex-4",
    "title": "Vex 4",
    "embedSlug": "vex-4",
    "genres": [
      "Platformer",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Vex%204%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 4891,
    "rating": 3.8
  },
  {
    "id": "vex-5",
    "title": "Vex 5",
    "embedSlug": "vex-5",
    "genres": [
      "Platformer",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Vex%205%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 14180,
    "rating": 4.9
  },
  {
    "id": "fireboy-and-watergirl",
    "title": "Fireboy and Watergirl",
    "embedSlug": "fireboy-and-watergirl-the-forest-temple",
    "genres": [
      "Puzzle",
      "Platformer",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Fireboy%20and%20Watergirl%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 17039,
    "rating": 4.6
  },
  {
    "id": "superhot",
    "title": "SuperHot",
    "embedSlug": "super-hot",
    "genres": [
      "Shooter",
      "Puzzle",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=SuperHot%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 10504,
    "rating": 4.4
  },
  {
    "id": "happy-wheels",
    "title": "Happy Wheels",
    "embedSlug": "happy-wheels",
    "genres": [
      "Arcade",
      "Racing"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Happy%20Wheels%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 13479,
    "rating": 3.8
  },
  {
    "id": "agar-io",
    "title": "Agar.io",
    "embedSlug": "agario",
    "genres": [
      ".io",
      "Multiplayer",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Agar.io%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 3056,
    "rating": 4.6
  },
  {
    "id": "slither-io",
    "title": "Slither.io",
    "embedSlug": "slitherio",
    "genres": [
      ".io",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Slither.io%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 8339,
    "rating": 3.7
  },
  {
    "id": "paper-io-2",
    "title": "Paper.io 2",
    "embedSlug": "paper-io-2",
    "genres": [
      ".io",
      "Multiplayer",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Paper.io%202%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 11057,
    "rating": 4
  },
  {
    "id": "hole-io",
    "title": "Hole.io",
    "embedSlug": "hole-io",
    "genres": [
      ".io",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Hole.io%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 10769,
    "rating": 4.2
  },
  {
    "id": "worms-zone",
    "title": "Worms Zone",
    "embedSlug": "worms-zone",
    "genres": [
      ".io",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Worms%20Zone%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 4483,
    "rating": 3.9
  },
  {
    "id": "little-big-snake",
    "title": "Little Big Snake",
    "embedSlug": "little-big-snake",
    "genres": [
      ".io",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Little%20Big%20Snake%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 13485,
    "rating": 4.5
  },
  {
    "id": "zombs-royale",
    "title": "Zombs Royale",
    "embedSlug": "zombsroyaleio",
    "genres": [
      ".io",
      "Shooter",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Zombs%20Royale%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 16997,
    "rating": 4.5
  },
  {
    "id": "surviv-io",
    "title": "Surviv.io",
    "embedSlug": "surviv-io",
    "genres": [
      ".io",
      "Shooter",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Surviv.io%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 12522,
    "rating": 3.9
  },
  {
    "id": "miniblox",
    "title": "Miniblox",
    "embedSlug": "miniblox",
    "genres": [
      "Action",
      "Building",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Miniblox%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 4572,
    "rating": 4.1
  },
  {
    "id": "vectaria-io",
    "title": "Vectaria.io",
    "embedSlug": "vectaria-io",
    "genres": [
      "Multiplayer",
      "Action",
      ".io"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Vectaria.io%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 10827,
    "rating": 4.4
  },
  {
    "id": "tiny-fishing",
    "title": "Tiny Fishing",
    "embedSlug": "tiny-fishing",
    "genres": [
      "Casual",
      "Simulation",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=Tiny%20Fishing%20game%20icon%20crazygames&w=512&h=512&c=7",
    "players": 16711,
    "rating": 3.8
  }
];

module.exports = GAMES;
