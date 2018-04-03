function Set() {
  var items = {}
  // this.has = (value) => value in items
  this.has = value => items.hasOwnProperty(value)

  this.add = value => {
    if (this.has(value)) {
      items[value] = value
      return true
    }
    return false
  }

  this.remove = value => {
    if (this.has(value)) {
      delete items[value]
      return true
    }
    return false
  }

  this.clear = () => {
    items = {}
  }

  this.size = () => Object.keys(items).length

  this.sizeLegacy = () => {
    var count = 0
    for (var prop in items) {
      if (items.hasOwnProperty(prop)) {
        count++
      }
    }
    return count
  }

  this.values = () => Object.keys(items)
}
