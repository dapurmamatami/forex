var qn = require('qn');
var fs = require('fs');
var path = require('path');

var client = qn.create({
    accessKey: 'LDNKlOrqLzBqq1N4-QzcmEXGuVwnQ2NdFq5H-Sv0',
    secretKey: 'vqXxIhjrqbi-7MNgSlA4zmysZuJTCK-0qxy2-Sxo',
    bucket: 'tigerwit-personal',
    domain: 'https://dn-itigerwit.qbox.me'
});

var options = [{
    folder: "./dist/images/",
    extNames:['.png', '.jpg']
},{
    folder: "./dist/ngsrc/",
    extNames:['.png', '.jpg']
},{
    folder: "./dist/styles/",
    extNames:['.css']
},{
    folder: "./dist/scripts/",
    extNames:['.js']
},{
    folder: "./dist/base/font-awesome/",
    extNames: ['.eot', '.svg', '.ttf', '.woff']
}];

/*options.forEach(function (folderItem) {
    var temptFolder = folderItem.folder;
    var temptExtName = folderItem.extNames;

    walkFolder(temptFolder, function (err, results) {
        results.forEach(function (fileItem) {
            var extName = path.extname(fileItem);
            
            if (temptExtName.indexOf(extName) >= 0) {
                var relativePath = path.relative('./dist/', fileItem);
                client.upload(fs.createReadStream(fileItem), {key: relativePath}, 
                        function (err, result) {
                    console.log(result)
                });
            }
        });
    });
});*/

//https://dn-itigerwit.qbox.me/

/*fs.readFile('./dist/index.html', 'utf-8', function (err, data) {

});*/


function walkFolder(startPath, callback) {
    var results = [];
    fs.readdir(startPath, function (err, fileList) {
        if (err) {
            return callback(err);
        }

        var pending = fileList.length;
        if (!pending) {
            return callback(null, results)
        }

        fileList.forEach(function (fileItem) {
            var filePath = startPath + '/' + fileItem;

            fs.stat(filePath, function (err, stat) {
                if (stat && stat.isDirectory()) {

                    walkFolder(filePath, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) {
                            callback(null, results);
                        }
                    });

                } else {
                    results.push(filePath);
                    if (!--pending) {
                        callback(null, results);
                    }
                }

            });

        });
    });
}
