const GAMES = [
  {
    "id": "smash-karts",
    "title": "Smash Karts",
    "embedSlug": "smash-karts",
    "genres": [
      "Racing",
      "Multiplayer",
      ".io"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Smash%20Karts%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 6042,
    "rating": 4.2
  },
  {
    "id": "shell-shockers",
    "title": "Shell Shockers",
    "embedSlug": "shellshockersio",
    "genres": [
      "Shooter",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Shell%20Shockers%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 8987,
    "rating": 4.9
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
    "image": "https://tse2.mm.bing.net/th?q=%22Ev.io%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 2112,
    "rating": 4.9
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
    "image": "https://tse2.mm.bing.net/th?q=%22Bloxd.io%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 1703,
    "rating": 4.9
  },
  {
    "id": "buildnow-gg",
    "title": "BuildNow GG",
    "embedSlug": "buildnow-gg",
    "genres": [
      "Shooter",
      "Building"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22BuildNow%20GG%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 4673,
    "rating": 4.3
  },
  {
    "id": "bullet-force",
    "title": "Bullet Force",
    "embedSlug": "bullet-force-multiplayer",
    "genres": [
      "Shooter",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Bullet%20Force%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 3180,
    "rating": 4.1
  },
  {
    "id": "rocket-bot-royale",
    "title": "Rocket Bot Royale",
    "embedSlug": "rocket-bot-royale",
    "genres": [
      "Shooter",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Rocket%20Bot%20Royale%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 20148,
    "rating": 4.8
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
    "image": "https://tse2.mm.bing.net/th?q=%22Krunker%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 5765,
    "rating": 3.8
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
    "image": "https://tse2.mm.bing.net/th?q=%22Voxiom.io%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 17485,
    "rating": 4.7
  },
  {
    "id": "forward-assault",
    "title": "Forward Assault",
    "embedSlug": "forward-assault-remix",
    "genres": [
      "Shooter",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Forward%20Assault%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 16724,
    "rating": 4.2
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
    "image": "https://tse2.mm.bing.net/th?q=%22Agar.io%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 5141,
    "rating": 4.9
  },
  {
    "id": "slither-io",
    "title": "Slither.io",
    "embedSlug": "slitherio",
    "genres": [
      ".io",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Slither.io%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 2300,
    "rating": 4.8
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
    "image": "https://tse2.mm.bing.net/th?q=%22Paper.io%202%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 20448,
    "rating": 4.6
  },
  {
    "id": "hole-io",
    "title": "Hole.io",
    "embedSlug": "hole-io",
    "genres": [
      ".io",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Hole.io%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 3901,
    "rating": 4.5
  },
  {
    "id": "worms-zone",
    "title": "Worms Zone",
    "embedSlug": "worms-zone",
    "genres": [
      ".io",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Worms%20Zone%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 11785,
    "rating": 3.5
  },
  {
    "id": "little-big-snake",
    "title": "Little Big Snake",
    "embedSlug": "little-big-snake",
    "genres": [
      ".io",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Little%20Big%20Snake%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 3517,
    "rating": 4.7
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
    "image": "https://tse2.mm.bing.net/th?q=%22Zombs%20Royale%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 17264,
    "rating": 4.1
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
    "image": "https://tse2.mm.bing.net/th?q=%22Surviv.io%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 8123,
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
    "image": "https://tse2.mm.bing.net/th?q=%22Miniblox%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 14506,
    "rating": 5
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
    "image": "https://tse2.mm.bing.net/th?q=%22Vectaria.io%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 13414,
    "rating": 3.9
  },
  {
    "id": "diep-io",
    "title": "Diep.io",
    "embedSlug": "diep-io",
    "genres": [
      ".io",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Diep.io%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 18242,
    "rating": 3.7
  },
  {
    "id": "skribbl-io",
    "title": "Skribbl.io",
    "embedSlug": "skribbl-io",
    "genres": [
      ".io",
      "Puzzle",
      "Party"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Skribbl.io%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 3273,
    "rating": 4.4
  },
  {
    "id": "crazy-roll-3d",
    "title": "Crazy Roll 3D",
    "embedSlug": "crazy-roll-3d",
    "genres": [
      "Platformer",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Crazy%20Roll%203D%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 17463,
    "rating": 4.9
  },
  {
    "id": "traffic-rider",
    "title": "Traffic Rider",
    "embedSlug": "traffic-rider",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Traffic%20Rider%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 3017,
    "rating": 4.5
  },
  {
    "id": "drift-hunters",
    "title": "Drift Hunters",
    "embedSlug": "drift-hunters",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Drift%20Hunters%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 19547,
    "rating": 3.6
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
    "image": "https://tse2.mm.bing.net/th?q=%22PolyTrack%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 11677,
    "rating": 4
  },
  {
    "id": "moto-x3m",
    "title": "Moto X3M",
    "embedSlug": "moto-x3m",
    "genres": [
      "Racing",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Moto%20X3M%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 3743,
    "rating": 4.9
  },
  {
    "id": "madalin-stunt-cars-2",
    "title": "Madalin Stunt Cars 2",
    "embedSlug": "madalin-stunt-cars-2",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Madalin%20Stunt%20Cars%202%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 5141,
    "rating": 3.6
  },
  {
    "id": "extreme-car-driving-simulator",
    "title": "Extreme Car Driving",
    "embedSlug": "extreme-car-driving-simulator",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Extreme%20Car%20Driving%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 4317,
    "rating": 4.8
  },
  {
    "id": "highway-racer",
    "title": "Highway Racer",
    "embedSlug": "highway-racer-3d",
    "genres": [
      "Racing",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Highway%20Racer%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 16787,
    "rating": 3.6
  },
  {
    "id": "city-car-driving",
    "title": "City Car Driving",
    "embedSlug": "city-car-driving-simulator",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22City%20Car%20Driving%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 6378,
    "rating": 3.7
  },
  {
    "id": "eggy-car",
    "title": "Eggy Car",
    "embedSlug": "eggy-car",
    "genres": [
      "Driving",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Eggy%20Car%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 13990,
    "rating": 4.5
  },
  {
    "id": "hill-climb-racing",
    "title": "Hill Climb Racing",
    "embedSlug": "hill-climb-racing",
    "genres": [
      "Driving",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Hill%20Climb%20Racing%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 19837,
    "rating": 4.6
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
    "image": "https://tse2.mm.bing.net/th?q=%22Basket%20Random%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 3687,
    "rating": 4.9
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
    "image": "https://tse2.mm.bing.net/th?q=%22Soccer%20Random%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 4187,
    "rating": 4
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
    "image": "https://tse2.mm.bing.net/th?q=%22Volley%20Random%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 1692,
    "rating": 3.5
  },
  {
    "id": "basketball-stars",
    "title": "Basketball Stars",
    "embedSlug": "basketball-stars-2019",
    "genres": [
      "Sports",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Basketball%20Stars%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 16481,
    "rating": 4.6
  },
  {
    "id": "penalty-shooters-2",
    "title": "Penalty Shooters 2",
    "embedSlug": "penalty-shooters-2",
    "genres": [
      "Sports",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Penalty%20Shooters%202%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 6171,
    "rating": 4.4
  },
  {
    "id": "table-tennis",
    "title": "Table Tennis World Tour",
    "embedSlug": "table-tennis-world-tour",
    "genres": [
      "Sports",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Table%20Tennis%20World%20Tour%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 16009,
    "rating": 3.6
  },
  {
    "id": "8-ball-billiards-classic",
    "title": "8 Ball Billiards Classic",
    "embedSlug": "8-ball-billiards-classic",
    "genres": [
      "Sports",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%228%20Ball%20Billiards%20Classic%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 19431,
    "rating": 3.8
  },
  {
    "id": "pool-club",
    "title": "Pool Club",
    "embedSlug": "pool-club",
    "genres": [
      "Sports",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Pool%20Club%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 11791,
    "rating": 4.4
  },
  {
    "id": "chess-free",
    "title": "Master Chess",
    "embedSlug": "master-chess",
    "genres": [
      "Board",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Master%20Chess%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 2223,
    "rating": 3.8
  },
  {
    "id": "checkers",
    "title": "Master Checkers",
    "embedSlug": "master-checkers",
    "genres": [
      "Board",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Master%20Checkers%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 18874,
    "rating": 3.9
  },
  {
    "id": "uno-online",
    "title": "Ono Card Game",
    "embedSlug": "ono-card-game",
    "genres": [
      "Card",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Ono%20Card%20Game%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 6028,
    "rating": 4.7
  },
  {
    "id": "ludo-hero",
    "title": "Ludo Hero",
    "embedSlug": "ludo-hero",
    "genres": [
      "Board",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Ludo%20Hero%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 18182,
    "rating": 4.1
  },
  {
    "id": "spider-solitaire",
    "title": "Spider Solitaire",
    "embedSlug": "spider-solitaire",
    "genres": [
      "Card",
      "Puzzle"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Spider%20Solitaire%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 16087,
    "rating": 4
  },
  {
    "id": "mahjongg-solitaire",
    "title": "Mahjongg Solitaire",
    "embedSlug": "mahjongg-solitaire",
    "genres": [
      "Puzzle",
      "Card"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Mahjongg%20Solitaire%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 5677,
    "rating": 3.6
  },
  {
    "id": "words-of-wonders",
    "title": "Words of Wonders",
    "embedSlug": "words-of-wonders",
    "genres": [
      "Word",
      "Puzzle"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Words%20of%20Wonders%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 5128,
    "rating": 4.1
  },
  {
    "id": "wordle",
    "title": "Wordle",
    "embedSlug": "wordle",
    "genres": [
      "Word",
      "Puzzle"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Wordle%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 17976,
    "rating": 4.5
  },
  {
    "id": "2048",
    "title": "2048",
    "embedSlug": "2048",
    "genres": [
      "Puzzle",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%222048%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 9908,
    "rating": 4.3
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
    "image": "https://tse2.mm.bing.net/th?q=%22Cubes%202048.io%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 5003,
    "rating": 3.9
  },
  {
    "id": "suika-game",
    "title": "Suika Game",
    "embedSlug": "suika-game",
    "genres": [
      "Puzzle",
      "Merge"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Suika%20Game%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 18275,
    "rating": 4.2
  },
  {
    "id": "bubble-shooter",
    "title": "Bubble Shooter",
    "embedSlug": "bubble-shooter",
    "genres": [
      "Puzzle",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Bubble%20Shooter%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 19484,
    "rating": 5
  },
  {
    "id": "flappy-bird",
    "title": "Flappy Bird",
    "embedSlug": "flappy-bird",
    "genres": [
      "Arcade",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Flappy%20Bird%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 15972,
    "rating": 4.5
  },
  {
    "id": "helix-jump",
    "title": "Helix Jump",
    "embedSlug": "helix-jump",
    "genres": [
      "Arcade",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Helix%20Jump%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 11192,
    "rating": 3.7
  },
  {
    "id": "temple-run-2",
    "title": "Temple Run 2",
    "embedSlug": "temple-run-2",
    "genres": [
      "Arcade",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Temple%20Run%202%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 18121,
    "rating": 4.8
  },
  {
    "id": "subway-surfers",
    "title": "Subway Surfers",
    "embedSlug": "subway-surfers",
    "genres": [
      "Arcade",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Subway%20Surfers%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 16932,
    "rating": 3.8
  },
  {
    "id": "geometry-dash",
    "title": "Geometry Dash",
    "embedSlug": "geometry-dash-online",
    "genres": [
      "Platformer",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Geometry%20Dash%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 13567,
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
    "image": "https://tse2.mm.bing.net/th?q=%22Slope%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 5615,
    "rating": 4.3
  },
  {
    "id": "tunnel-rush",
    "title": "Tunnel Rush",
    "embedSlug": "tunnel-rush",
    "genres": [
      "Arcade",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Tunnel%20Rush%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 14717,
    "rating": 3.8
  },
  {
    "id": "color-tunnel",
    "title": "Color Tunnel",
    "embedSlug": "color-tunnel",
    "genres": [
      "Arcade",
      "Puzzle"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Color%20Tunnel%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 8541,
    "rating": 4.1
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
    "image": "https://tse2.mm.bing.net/th?q=%22Papa's%20Pizzeria%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 4610,
    "rating": 3.9
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
    "image": "https://tse2.mm.bing.net/th?q=%22Papa's%20Freezeria%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 17816,
    "rating": 4.7
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
    "image": "https://tse2.mm.bing.net/th?q=%22Papa's%20Burgeria%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 4878,
    "rating": 4.8
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
    "image": "https://tse2.mm.bing.net/th?q=%22Papa's%20Scooperia%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 4782,
    "rating": 4.5
  },
  {
    "id": "capybara-clicker",
    "title": "Capybara Clicker",
    "embedSlug": "capybara-clicker",
    "genres": [
      "Idle",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Capybara%20Clicker%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 6162,
    "rating": 3.7
  },
  {
    "id": "doge-miner-2",
    "title": "Doge Miner 2",
    "embedSlug": "doge-miner-2",
    "genres": [
      "Idle",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Doge%20Miner%202%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 3763,
    "rating": 4.4
  },
  {
    "id": "clicker-heroes",
    "title": "Clicker Heroes",
    "embedSlug": "clicker-heroes",
    "genres": [
      "Idle",
      "RPG"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Clicker%20Heroes%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 13784,
    "rating": 4.2
  },
  {
    "id": "cookie-clicker",
    "title": "Cookie Clicker",
    "embedSlug": "cookie-clicker",
    "genres": [
      "Idle",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Cookie%20Clicker%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 17787,
    "rating": 4.6
  },
  {
    "id": "idle-breakout",
    "title": "Idle Breakout",
    "embedSlug": "idle-breakout",
    "genres": [
      "Idle",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Idle%20Breakout%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 20398,
    "rating": 4.2
  },
  {
    "id": "babel-tower",
    "title": "Babel Tower",
    "embedSlug": "babel-tower",
    "genres": [
      "Idle",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Babel%20Tower%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 5874,
    "rating": 4
  },
  {
    "id": "farm-merge-valley",
    "title": "Farm Merge Valley",
    "embedSlug": "farm-merge-valley",
    "genres": [
      "Simulation",
      "Puzzle"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Farm%20Merge%20Valley%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 12069,
    "rating": 3.7
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
    "image": "https://tse2.mm.bing.net/th?q=%22Duck%20Life%204%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 17469,
    "rating": 4
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
    "image": "https://tse2.mm.bing.net/th?q=%22BitLife%20-%20Life%20Simulator%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 9200,
    "rating": 4.8
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
    "image": "https://tse2.mm.bing.net/th?q=%22Sandbox%20City%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 18422,
    "rating": 4.3
  },
  {
    "id": "granny",
    "title": "Granny",
    "embedSlug": "granny",
    "genres": [
      "Horror",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Granny%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 8261,
    "rating": 4.3
  },
  {
    "id": "fnaf",
    "title": "Five Nights at Freddy's",
    "embedSlug": "five-nights-at-freddys",
    "genres": [
      "Horror",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Five%20Nights%20at%20Freddy's%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 16115,
    "rating": 4.1
  },
  {
    "id": "fnaf-2",
    "title": "Five Nights at Freddy's 2",
    "embedSlug": "five-nights-at-freddys-2",
    "genres": [
      "Horror",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Five%20Nights%20at%20Freddy's%202%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 6243,
    "rating": 4
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
    "image": "https://tse2.mm.bing.net/th?q=%22Stickman%20Hook%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 8378,
    "rating": 4.5
  },
  {
    "id": "vex-4",
    "title": "Vex 4",
    "embedSlug": "vex-4",
    "genres": [
      "Platformer",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Vex%204%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 1577,
    "rating": 4.4
  },
  {
    "id": "vex-5",
    "title": "Vex 5",
    "embedSlug": "vex-5",
    "genres": [
      "Platformer",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Vex%205%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 15186,
    "rating": 3.7
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
    "image": "https://tse2.mm.bing.net/th?q=%22Fireboy%20and%20Watergirl%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 5343,
    "rating": 4.8
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
    "image": "https://tse2.mm.bing.net/th?q=%22SuperHot%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 14779,
    "rating": 3.9
  },
  {
    "id": "happy-wheels",
    "title": "Happy Wheels",
    "embedSlug": "happy-wheels",
    "genres": [
      "Arcade",
      "Racing"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Happy%20Wheels%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 9396,
    "rating": 4.7
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
    "image": "https://tse2.mm.bing.net/th?q=%22Tiny%20Fishing%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 1920,
    "rating": 3.8
  },
  {
    "id": "getting-over-it",
    "title": "Getting Over It",
    "embedSlug": "getting-over-it",
    "genres": [
      "Platformer",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Getting%20Over%20It%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 9024,
    "rating": 4.5
  },
  {
    "id": "rooftop-snipers",
    "title": "Rooftop Snipers",
    "embedSlug": "rooftop-snipers",
    "genres": [
      "Shooter",
      "Action",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Rooftop%20Snipers%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 16844,
    "rating": 4.2
  },
  {
    "id": "getaway-shootout",
    "title": "Getaway Shootout",
    "embedSlug": "getaway-shootout",
    "genres": [
      "Shooter",
      "Platformer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Getaway%20Shootout%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 9710,
    "rating": 4.6
  },
  {
    "id": "raft-wars",
    "title": "Raft Wars",
    "embedSlug": "raft-wars",
    "genres": [
      "Shooter",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Raft%20Wars%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 12891,
    "rating": 4.5
  },
  {
    "id": "bomb-it-7",
    "title": "Bomb It 7",
    "embedSlug": "bomb-it-7",
    "genres": [
      "Action",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Bomb%20It%207%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 15157,
    "rating": 3.5
  },
  {
    "id": "dino-game",
    "title": "Dinosaur Game",
    "embedSlug": "dinosaur-game",
    "genres": [
      "Arcade",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Dinosaur%20Game%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 9128,
    "rating": 4
  },
  {
    "id": "slope-3",
    "title": "Slope 3",
    "embedSlug": "slope-3",
    "genres": [
      "Arcade",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Slope%203%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 6710,
    "rating": 4.1
  },
  {
    "id": "run-3",
    "title": "Run 3",
    "embedSlug": "run-3",
    "genres": [
      "Platformer",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Run%203%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 14835,
    "rating": 4.6
  },
  {
    "id": "among-us",
    "title": "Among Us Online",
    "embedSlug": "among-us-online",
    "genres": [
      "Strategy",
      "Multiplayer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Among%20Us%20Online%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 18582,
    "rating": 4.4
  },
  {
    "id": "fireboy-and-watergirl-2",
    "title": "Fireboy and Watergirl 2",
    "embedSlug": "fireboy-and-watergirl-2",
    "genres": [
      "Puzzle",
      "Platformer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Fireboy%20and%20Watergirl%202%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 9523,
    "rating": 4.2
  },
  {
    "id": "fireboy-and-watergirl-3",
    "title": "Fireboy and Watergirl 3",
    "embedSlug": "fireboy-and-watergirl-3",
    "genres": [
      "Puzzle",
      "Platformer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Fireboy%20and%20Watergirl%203%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 18063,
    "rating": 4.2
  },
  {
    "id": "fireboy-and-watergirl-4",
    "title": "Fireboy and Watergirl 4",
    "embedSlug": "fireboy-and-watergirl-4",
    "genres": [
      "Puzzle",
      "Platformer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Fireboy%20and%20Watergirl%204%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 12025,
    "rating": 3.9
  },
  {
    "id": "fireboy-and-watergirl-5",
    "title": "Fireboy and Watergirl 5",
    "embedSlug": "fireboy-and-watergirl-5",
    "genres": [
      "Puzzle",
      "Platformer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Fireboy%20and%20Watergirl%205%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 14154,
    "rating": 3.9
  },
  {
    "id": "fireboy-and-watergirl-6",
    "title": "Fireboy and Watergirl 6",
    "embedSlug": "fireboy-and-watergirl-6",
    "genres": [
      "Puzzle",
      "Platformer"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Fireboy%20and%20Watergirl%206%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 8506,
    "rating": 3.9
  },
  {
    "id": "bob-the-robber-1",
    "title": "Bob The Robber 1",
    "embedSlug": "bob-the-robber-1",
    "genres": [
      "Puzzle",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Bob%20The%20Robber%201%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 15307,
    "rating": 5
  },
  {
    "id": "wheely-1",
    "title": "Wheely 1",
    "embedSlug": "wheely-1",
    "genres": [
      "Puzzle",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Wheely%201%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 5268,
    "rating": 3.8
  },
  {
    "id": "snail-bob-1",
    "title": "Snail Bob 1",
    "embedSlug": "snail-bob-1",
    "genres": [
      "Puzzle",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Snail%20Bob%201%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 14920,
    "rating": 4.7
  },
  {
    "id": "monkey-go-happy-1",
    "title": "Monkey GO Happy 1",
    "embedSlug": "monkey-go-happy-1",
    "genres": [
      "Puzzle",
      "Point and Click"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Monkey%20GO%20Happy%201%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 18279,
    "rating": 4.6
  },
  {
    "id": "bob-the-robber-2",
    "title": "Bob The Robber 2",
    "embedSlug": "bob-the-robber-2",
    "genres": [
      "Puzzle",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Bob%20The%20Robber%202%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 6758,
    "rating": 4
  },
  {
    "id": "wheely-2",
    "title": "Wheely 2",
    "embedSlug": "wheely-2",
    "genres": [
      "Puzzle",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Wheely%202%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 11627,
    "rating": 4.3
  },
  {
    "id": "snail-bob-2",
    "title": "Snail Bob 2",
    "embedSlug": "snail-bob-2",
    "genres": [
      "Puzzle",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Snail%20Bob%202%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 11676,
    "rating": 4.7
  },
  {
    "id": "monkey-go-happy-2",
    "title": "Monkey GO Happy 2",
    "embedSlug": "monkey-go-happy-2",
    "genres": [
      "Puzzle",
      "Point and Click"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Monkey%20GO%20Happy%202%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 7367,
    "rating": 4.5
  },
  {
    "id": "bob-the-robber-3",
    "title": "Bob The Robber 3",
    "embedSlug": "bob-the-robber-3",
    "genres": [
      "Puzzle",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Bob%20The%20Robber%203%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 5433,
    "rating": 4.3
  },
  {
    "id": "wheely-3",
    "title": "Wheely 3",
    "embedSlug": "wheely-3",
    "genres": [
      "Puzzle",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Wheely%203%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 15944,
    "rating": 4.4
  },
  {
    "id": "snail-bob-3",
    "title": "Snail Bob 3",
    "embedSlug": "snail-bob-3",
    "genres": [
      "Puzzle",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Snail%20Bob%203%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 10496,
    "rating": 3.5
  },
  {
    "id": "monkey-go-happy-3",
    "title": "Monkey GO Happy 3",
    "embedSlug": "monkey-go-happy-3",
    "genres": [
      "Puzzle",
      "Point and Click"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Monkey%20GO%20Happy%203%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 11397,
    "rating": 4
  },
  {
    "id": "bob-the-robber-4",
    "title": "Bob The Robber 4",
    "embedSlug": "bob-the-robber-4",
    "genres": [
      "Puzzle",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Bob%20The%20Robber%204%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 20266,
    "rating": 4.3
  },
  {
    "id": "wheely-4",
    "title": "Wheely 4",
    "embedSlug": "wheely-4",
    "genres": [
      "Puzzle",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Wheely%204%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 9692,
    "rating": 4.9
  },
  {
    "id": "snail-bob-4",
    "title": "Snail Bob 4",
    "embedSlug": "snail-bob-4",
    "genres": [
      "Puzzle",
      "Casual"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Snail%20Bob%204%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 11487,
    "rating": 4.5
  },
  {
    "id": "monkey-go-happy-4",
    "title": "Monkey GO Happy 4",
    "embedSlug": "monkey-go-happy-4",
    "genres": [
      "Puzzle",
      "Point and Click"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Monkey%20GO%20Happy%204%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 12897,
    "rating": 4.2
  },
  {
    "id": "crazy-game-1",
    "title": "Awesome Action Game 1",
    "embedSlug": "slope",
    "genres": [
      "Action",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Awesome%20Action%20Game%201%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 10653,
    "rating": 4.9
  },
  {
    "id": "crazy-racer-1",
    "title": "Speed Racer 1",
    "embedSlug": "drift-hunters",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Speed%20Racer%201%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 20889,
    "rating": 4.4
  },
  {
    "id": "crazy-puzzle-1",
    "title": "Brain Teaser 1",
    "embedSlug": "2048",
    "genres": [
      "Puzzle",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Brain%20Teaser%201%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 9486,
    "rating": 4.2
  },
  {
    "id": "crazy-shooter-1",
    "title": "Sniper Assassin 1",
    "embedSlug": "shellshockersio",
    "genres": [
      "Shooter",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Sniper%20Assassin%201%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 14025,
    "rating": 4.5
  },
  {
    "id": "crazy-game-2",
    "title": "Awesome Action Game 2",
    "embedSlug": "slope",
    "genres": [
      "Action",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Awesome%20Action%20Game%202%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 8098,
    "rating": 4.1
  },
  {
    "id": "crazy-racer-2",
    "title": "Speed Racer 2",
    "embedSlug": "drift-hunters",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Speed%20Racer%202%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 14567,
    "rating": 3.6
  },
  {
    "id": "crazy-puzzle-2",
    "title": "Brain Teaser 2",
    "embedSlug": "2048",
    "genres": [
      "Puzzle",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Brain%20Teaser%202%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 7738,
    "rating": 4.3
  },
  {
    "id": "crazy-shooter-2",
    "title": "Sniper Assassin 2",
    "embedSlug": "shellshockersio",
    "genres": [
      "Shooter",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Sniper%20Assassin%202%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 6137,
    "rating": 4.2
  },
  {
    "id": "crazy-game-3",
    "title": "Awesome Action Game 3",
    "embedSlug": "slope",
    "genres": [
      "Action",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Awesome%20Action%20Game%203%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 17258,
    "rating": 4.7
  },
  {
    "id": "crazy-racer-3",
    "title": "Speed Racer 3",
    "embedSlug": "drift-hunters",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Speed%20Racer%203%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 10104,
    "rating": 4.4
  },
  {
    "id": "crazy-puzzle-3",
    "title": "Brain Teaser 3",
    "embedSlug": "2048",
    "genres": [
      "Puzzle",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Brain%20Teaser%203%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 3165,
    "rating": 3.8
  },
  {
    "id": "crazy-shooter-3",
    "title": "Sniper Assassin 3",
    "embedSlug": "shellshockersio",
    "genres": [
      "Shooter",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Sniper%20Assassin%203%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 19002,
    "rating": 4.4
  },
  {
    "id": "crazy-game-4",
    "title": "Awesome Action Game 4",
    "embedSlug": "slope",
    "genres": [
      "Action",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Awesome%20Action%20Game%204%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 5187,
    "rating": 3.9
  },
  {
    "id": "crazy-racer-4",
    "title": "Speed Racer 4",
    "embedSlug": "drift-hunters",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Speed%20Racer%204%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 9496,
    "rating": 4.8
  },
  {
    "id": "crazy-puzzle-4",
    "title": "Brain Teaser 4",
    "embedSlug": "2048",
    "genres": [
      "Puzzle",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Brain%20Teaser%204%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 13145,
    "rating": 4.7
  },
  {
    "id": "crazy-shooter-4",
    "title": "Sniper Assassin 4",
    "embedSlug": "shellshockersio",
    "genres": [
      "Shooter",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Sniper%20Assassin%204%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 18755,
    "rating": 4.1
  },
  {
    "id": "crazy-game-5",
    "title": "Awesome Action Game 5",
    "embedSlug": "slope",
    "genres": [
      "Action",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Awesome%20Action%20Game%205%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 12103,
    "rating": 4.9
  },
  {
    "id": "crazy-racer-5",
    "title": "Speed Racer 5",
    "embedSlug": "drift-hunters",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Speed%20Racer%205%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 4387,
    "rating": 3.8
  },
  {
    "id": "crazy-puzzle-5",
    "title": "Brain Teaser 5",
    "embedSlug": "2048",
    "genres": [
      "Puzzle",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Brain%20Teaser%205%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 14718,
    "rating": 4.4
  },
  {
    "id": "crazy-shooter-5",
    "title": "Sniper Assassin 5",
    "embedSlug": "shellshockersio",
    "genres": [
      "Shooter",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Sniper%20Assassin%205%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 2158,
    "rating": 4.3
  },
  {
    "id": "crazy-game-6",
    "title": "Awesome Action Game 6",
    "embedSlug": "slope",
    "genres": [
      "Action",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Awesome%20Action%20Game%206%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 12514,
    "rating": 4.9
  },
  {
    "id": "crazy-racer-6",
    "title": "Speed Racer 6",
    "embedSlug": "drift-hunters",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Speed%20Racer%206%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 5333,
    "rating": 3.9
  },
  {
    "id": "crazy-puzzle-6",
    "title": "Brain Teaser 6",
    "embedSlug": "2048",
    "genres": [
      "Puzzle",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Brain%20Teaser%206%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 8221,
    "rating": 4.4
  },
  {
    "id": "crazy-shooter-6",
    "title": "Sniper Assassin 6",
    "embedSlug": "shellshockersio",
    "genres": [
      "Shooter",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Sniper%20Assassin%206%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 5808,
    "rating": 4.8
  },
  {
    "id": "crazy-game-7",
    "title": "Awesome Action Game 7",
    "embedSlug": "slope",
    "genres": [
      "Action",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Awesome%20Action%20Game%207%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 6953,
    "rating": 3.5
  },
  {
    "id": "crazy-racer-7",
    "title": "Speed Racer 7",
    "embedSlug": "drift-hunters",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Speed%20Racer%207%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 11444,
    "rating": 4.7
  },
  {
    "id": "crazy-puzzle-7",
    "title": "Brain Teaser 7",
    "embedSlug": "2048",
    "genres": [
      "Puzzle",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Brain%20Teaser%207%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 15549,
    "rating": 3.7
  },
  {
    "id": "crazy-shooter-7",
    "title": "Sniper Assassin 7",
    "embedSlug": "shellshockersio",
    "genres": [
      "Shooter",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Sniper%20Assassin%207%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 9045,
    "rating": 3.8
  },
  {
    "id": "crazy-game-8",
    "title": "Awesome Action Game 8",
    "embedSlug": "slope",
    "genres": [
      "Action",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Awesome%20Action%20Game%208%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 8397,
    "rating": 4
  },
  {
    "id": "crazy-racer-8",
    "title": "Speed Racer 8",
    "embedSlug": "drift-hunters",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Speed%20Racer%208%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 17896,
    "rating": 4.7
  },
  {
    "id": "crazy-puzzle-8",
    "title": "Brain Teaser 8",
    "embedSlug": "2048",
    "genres": [
      "Puzzle",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Brain%20Teaser%208%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 19039,
    "rating": 4
  },
  {
    "id": "crazy-shooter-8",
    "title": "Sniper Assassin 8",
    "embedSlug": "shellshockersio",
    "genres": [
      "Shooter",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Sniper%20Assassin%208%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 2307,
    "rating": 4.4
  },
  {
    "id": "crazy-game-9",
    "title": "Awesome Action Game 9",
    "embedSlug": "slope",
    "genres": [
      "Action",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Awesome%20Action%20Game%209%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 18925,
    "rating": 4
  },
  {
    "id": "crazy-racer-9",
    "title": "Speed Racer 9",
    "embedSlug": "drift-hunters",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Speed%20Racer%209%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 11691,
    "rating": 4.5
  },
  {
    "id": "crazy-puzzle-9",
    "title": "Brain Teaser 9",
    "embedSlug": "2048",
    "genres": [
      "Puzzle",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Brain%20Teaser%209%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 6942,
    "rating": 4.4
  },
  {
    "id": "crazy-shooter-9",
    "title": "Sniper Assassin 9",
    "embedSlug": "shellshockersio",
    "genres": [
      "Shooter",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Sniper%20Assassin%209%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 11644,
    "rating": 5
  },
  {
    "id": "crazy-game-10",
    "title": "Awesome Action Game 10",
    "embedSlug": "slope",
    "genres": [
      "Action",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Awesome%20Action%20Game%2010%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 10679,
    "rating": 4.4
  },
  {
    "id": "crazy-racer-10",
    "title": "Speed Racer 10",
    "embedSlug": "drift-hunters",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Speed%20Racer%2010%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 6644,
    "rating": 4.4
  },
  {
    "id": "crazy-puzzle-10",
    "title": "Brain Teaser 10",
    "embedSlug": "2048",
    "genres": [
      "Puzzle",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Brain%20Teaser%2010%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 10728,
    "rating": 4.1
  },
  {
    "id": "crazy-shooter-10",
    "title": "Sniper Assassin 10",
    "embedSlug": "shellshockersio",
    "genres": [
      "Shooter",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Sniper%20Assassin%2010%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 17991,
    "rating": 3.9
  },
  {
    "id": "crazy-game-11",
    "title": "Awesome Action Game 11",
    "embedSlug": "slope",
    "genres": [
      "Action",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Awesome%20Action%20Game%2011%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 20835,
    "rating": 4.9
  },
  {
    "id": "crazy-racer-11",
    "title": "Speed Racer 11",
    "embedSlug": "drift-hunters",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Speed%20Racer%2011%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 16738,
    "rating": 4.2
  },
  {
    "id": "crazy-puzzle-11",
    "title": "Brain Teaser 11",
    "embedSlug": "2048",
    "genres": [
      "Puzzle",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Brain%20Teaser%2011%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 19324,
    "rating": 4.4
  },
  {
    "id": "crazy-shooter-11",
    "title": "Sniper Assassin 11",
    "embedSlug": "shellshockersio",
    "genres": [
      "Shooter",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Sniper%20Assassin%2011%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 11220,
    "rating": 5
  },
  {
    "id": "crazy-game-12",
    "title": "Awesome Action Game 12",
    "embedSlug": "slope",
    "genres": [
      "Action",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Awesome%20Action%20Game%2012%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 14941,
    "rating": 3.6
  },
  {
    "id": "crazy-racer-12",
    "title": "Speed Racer 12",
    "embedSlug": "drift-hunters",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Speed%20Racer%2012%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 9746,
    "rating": 3.8
  },
  {
    "id": "crazy-puzzle-12",
    "title": "Brain Teaser 12",
    "embedSlug": "2048",
    "genres": [
      "Puzzle",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Brain%20Teaser%2012%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 4202,
    "rating": 4.8
  },
  {
    "id": "crazy-shooter-12",
    "title": "Sniper Assassin 12",
    "embedSlug": "shellshockersio",
    "genres": [
      "Shooter",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Sniper%20Assassin%2012%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 15547,
    "rating": 4.1
  },
  {
    "id": "crazy-game-13",
    "title": "Awesome Action Game 13",
    "embedSlug": "slope",
    "genres": [
      "Action",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Awesome%20Action%20Game%2013%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 16506,
    "rating": 3.8
  },
  {
    "id": "crazy-racer-13",
    "title": "Speed Racer 13",
    "embedSlug": "drift-hunters",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Speed%20Racer%2013%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 4941,
    "rating": 4.2
  },
  {
    "id": "crazy-puzzle-13",
    "title": "Brain Teaser 13",
    "embedSlug": "2048",
    "genres": [
      "Puzzle",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Brain%20Teaser%2013%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 1601,
    "rating": 4.7
  },
  {
    "id": "crazy-shooter-13",
    "title": "Sniper Assassin 13",
    "embedSlug": "shellshockersio",
    "genres": [
      "Shooter",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Sniper%20Assassin%2013%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 3193,
    "rating": 3.6
  },
  {
    "id": "crazy-game-14",
    "title": "Awesome Action Game 14",
    "embedSlug": "slope",
    "genres": [
      "Action",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Awesome%20Action%20Game%2014%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 19674,
    "rating": 4
  },
  {
    "id": "crazy-racer-14",
    "title": "Speed Racer 14",
    "embedSlug": "drift-hunters",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Speed%20Racer%2014%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 7602,
    "rating": 3.9
  },
  {
    "id": "crazy-puzzle-14",
    "title": "Brain Teaser 14",
    "embedSlug": "2048",
    "genres": [
      "Puzzle",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Brain%20Teaser%2014%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 7454,
    "rating": 4.3
  },
  {
    "id": "crazy-shooter-14",
    "title": "Sniper Assassin 14",
    "embedSlug": "shellshockersio",
    "genres": [
      "Shooter",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Sniper%20Assassin%2014%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 2667,
    "rating": 3.7
  },
  {
    "id": "crazy-game-15",
    "title": "Awesome Action Game 15",
    "embedSlug": "slope",
    "genres": [
      "Action",
      "Arcade"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Awesome%20Action%20Game%2015%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 12223,
    "rating": 3.9
  },
  {
    "id": "crazy-racer-15",
    "title": "Speed Racer 15",
    "embedSlug": "drift-hunters",
    "genres": [
      "Racing",
      "Simulation"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Speed%20Racer%2015%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 8255,
    "rating": 3.6
  },
  {
    "id": "crazy-puzzle-15",
    "title": "Brain Teaser 15",
    "embedSlug": "2048",
    "genres": [
      "Puzzle",
      "Strategy"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Brain%20Teaser%2015%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 14967,
    "rating": 4.1
  },
  {
    "id": "crazy-shooter-15",
    "title": "Sniper Assassin 15",
    "embedSlug": "shellshockersio",
    "genres": [
      "Shooter",
      "Action"
    ],
    "image": "https://tse2.mm.bing.net/th?q=%22Sniper%20Assassin%2015%22%20crazygames%20cover%20thumbnail&w=640&h=360&c=7&rs=1&p=0",
    "players": 11081,
    "rating": 4.8
  }
];
module.exports = GAMES;