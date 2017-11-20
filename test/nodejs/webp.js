var fs = require('fs'),
    gm = require('gm');
var src = "img/";
// resize and remove EXIF profile data
gm(src+"cj_01.png")
    .resize(240, 240)
    .noProfile()
    .write(src+'resize.webp', function (err) {
        if (!err) console.log('done');
    });