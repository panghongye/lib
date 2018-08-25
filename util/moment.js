var day
var format = str => {
  var year = day.getFullYear()
  var month = day.getMonth() + 1
  var date = day.getDate()
  return str
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', date)
}
module.exports = d => {
  day = new Date(d)
  return {
    format: format,
  }
}
