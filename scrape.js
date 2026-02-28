const fs = require('fs');

const html = fs.readFileSync('cg.html', 'utf8');
const regex = /\"(https:\/\/images\.crazygames\.com\/[^"]+)\"/g;
let match;
const urls = new Set();

while ((match = regex.exec(html)) !== null) {
  if (match[1].includes('cover')) {
    urls.add(match[1]);
  }
}

console.log(Array.from(urls).slice(0, 10));
