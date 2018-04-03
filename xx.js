var request = require('superagent')

setInterval(() => {
  var url = `http://192.168.1.123:3000/`

  request.get(url).end((err, res) => {
    if (err) console.trace(err)
    console.log(res.body)
  })
}, 0)
