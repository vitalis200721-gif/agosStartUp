const https = require('https');

function testUrl(url) {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
        console.log(`URL: ${url}`);
        console.log(`Status: ${res.statusCode}`);
        console.log('X-Frame-Options:', res.headers['x-frame-options']);
        console.log('Content-Security-Policy:', res.headers['content-security-policy']);
        console.log('---------------------------');
    }).on('error', (e) => {
        console.error(e);
    });
}

testUrl('https://www.crazygames.com/embed/smash-karts');
testUrl('https://games.crazygames.com/en_US/smash-karts/index.html');
testUrl('https://1v1.lol/');
testUrl('https://shellshock.io/');
testUrl('https://poki.com/en/g/crossy-road');
