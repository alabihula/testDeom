var fs = require('fs');
var path = 'E:/';
fs.writeFile(path + "test.txt", 
    str(),
    function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});

function str() {
    var arr = [
        '凯威二笔：2222',
        '凯威白痴：dfdfdf'
    ];
    return arr.join('\n');
}