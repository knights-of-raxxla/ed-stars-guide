const fs = require('fs');
let json = require('./stars.json') ;



let out = JSON.stringify(json, null, 4);
console.log(out);

fs.writeFileSync('./stars_ok.json', out);




