'首字母大写'.replace(/(\w)/, function(v) {
  return v.toUpperCase()
})

// 彻底冻结对象
var constantize = obj => {
  Object.freeze(obj)
  Object.keys(obj).forEach((key, value) => {
    if (typeof obj[key] === 'object') {
      constantize(obj[key])
    }
  })
}
