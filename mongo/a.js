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


const Schema_videos = new Schema({
    name: String,
    _id: String,
})
Schema_videos.set('toJSON', { getters: true, virtuals: true });
Schema_videos.set('toObject', { getters: true, virtuals: true });


const Schema_musics = new Schema({
    name: String,
})
Schema_musics.set('toJSON', { getters: true, virtuals: true });
Schema_musics.set('toObject', { getters: true, virtuals: true });


const Schema_comments = new Schema({
    content: String,
    cid: {
        $ref: String,
    }
})
Schema_comments.set('toJSON', { getters: true, virtuals: true });
Schema_comments.set('toObject', { getters: true, virtuals: true });

mongoose.model('videos', Schema_videos)
mongoose.model('musics', Schema_musics)
mongoose.model('comments', Schema_comments)


let { videos, musics, comments } = mongoose.models
videos = new videos()
musics = new musics()
comments = new comments()


async function fn() {
    try {
        await videos.save({ name: 'v1', _id: 'v1' })
        await musics.save({ name: 'm1', _id: 'm1' })
        await comments.save({ content: 'v1-1', cid: { $ref: 'videos', $id: 'v1' } })

        console.info({ db, mongoose })


    }
    catch (err) { console.error(err) }
}


fn()








