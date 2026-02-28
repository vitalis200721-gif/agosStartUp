const https = require('https');

function testUrl(url) {
  return new Promise(resolve => {
    https.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://www.crazygames.com/',
            'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        }
    }, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => resolve({ url, error: e.message }));
  });
}

async function run() {
  const base = "https://images.crazygames.com/bloxdhop-io_16x9/1660124233777/bloxdhop-io_16x9-cover";
  
  const tests = [
    base,
    base + "?auto=format,compress&q=75&cs=strip",
    "https://images.crazygames.com/games/bloxd-io/cover-16x9/crop-640x360.png",
    "https://images.crazygames.com/bloxdhop-io_16x9/1660124233777/bloxdhop-io_16x9-cover.png",
    "https://images.crazygames.com/bloxdhop-io_16x9/1660124233777/bloxdhop-io_16x9-cover.webp"
  ];
  
  for (const t of tests) {
    const r = await testUrl(t);
    console.log(r.status, r.url);
  }
}

run();
