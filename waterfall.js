let async = require('async');

// var a = (cb) => {
//     var n = ['a']
//     console.log('a')
//     cb(null, n)
// }

// var b = (n, cb) => {
//     console.log(n)
//     cb(null, n)
// }
// var c = (n, cb) => {
//     console.log('c')
//     cb(null, n)
// }

// async.waterfall([a, b, c],
//     (err, n) => {
//         if (err) {
//             console.error(err);
//             return
//         }
//         console.log('ok')
//         console.log(n)
//     })




async.series({
        a: function(cb) {
            cb(null, 1);
        },
        b: function(cb) {
            cb(null, 2);
        }
    },
    function(err, results) {
        console.trace(results);
    });