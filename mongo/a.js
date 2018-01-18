const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = mongoose.connection
mongoose.connect('mongodb://localhost/TT')


db.once('open', () => {
    console.log('连接数据成功')
})

db.on('error', function (error) {
    console.trace('Error in MongoDb connection: ' + error)
    mongoose.disconnect()
})

db.on('close', function () {
    console.log('数据库断开')
})


