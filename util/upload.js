const multer = require('multer')
const uuidV1 = require('uuid/v1')
const path = require('path')
const fs = require('fs')
const cos = require('../../util/cos')
const config = require('../../config').cos
const mkdirsSync = require('../../util/mkdirs').mkdirsSync

module.exports = (req, res) => {
  let uploadDir
  let fileName
  multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        uploadDir = path.join(__dirname, '../../public/temp/')
        mkdirsSync(uploadDir)
        cb(null, uploadDir)
      },

      filename(req, file, cb) {
        fileName = `${file.originalname}`
        cb(null, fileName)
      },
    }),
  }).fields([{ name: 'file', maxCount: 1 }])(req, res, err => {
    if (err) return res.json({ code: 0, err })

    let { body } = req

    if (!body.cosDir) return res.json({ code: 0, err: 'cosDir 不存在' })

    let date = new Date()
    const datePath = `${date.getFullYear()}/${date.getMonth() +
      1}/${date.getDate()}`

    let Key = `${body.cosDir}/${datePath}/${fileName}`

    let file = req.files.file[0]

    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key: '/topic/2018/7/19/ivideo-1.1.1-mac.zip',
        Body:
          '/Users/cc/Desktop/Project/anzai_tyt_admin_api/public/temp/ivideo-1.1.1-mac.zip' ||
          file.path,
        ContentLength: '46119116' || file.size,
        onProgress: function(progressData) {
          // console.log(progressData)
        },
      },
      function(err, data) {
        if (err) return res.json({ data: {}, code: 0, err })

        res.json({
          code: 1,
          data,
        })
      },
    )
  })
}
