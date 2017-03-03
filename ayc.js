var result
var error
var pArr
var i = 0
var item
var cb
var fn = (err, n) => {
    if (err == null) {
        result = n
        if (i < pArr.length-1) {
            i++
            item = pArr[i]
            item(result,fn)
        } else {
            cb(error, result)
        }
    } else {
        error = err
        cb(error, result)
    }

}
var waterfall = (arr, cbk) => {
    pArr = arr
    item = pArr[i]
    cb = cbk
    item(fn)

}

module.exports = {
    waterfall: waterfall
}