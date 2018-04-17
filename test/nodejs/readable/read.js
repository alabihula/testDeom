var fs = require('fs');  
var readStream = fs.createReadStream('./readable/readStr.txt');  
var writeStream = fs.createWriteStream('./readable/writeStr.txt');  

var data = '';
readStream.on('data', function(chunk) { // 当有数据流出时，写入数据 
    data = data+chunk; 
    if (writeStream.write(chunk) === false) { // 如果没有写完，暂停读取流  
        readStream.pause();  
    }
});  
  
writeStream.on('drain', function() { // 写完后，继续读取  
    readStream.resume();  
});  
  
readStream.on('end', function() { // 当没有数据时，关闭数据流  
    console.log('end',data);
    writeStream.end();  
});  