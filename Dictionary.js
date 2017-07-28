export function Dictionary() {
  var items = {};

  // this.has = (key) => key in items;
  this.has = (key) => items.hasOwnProperty(key);

  this.set = (key, value) => {
    items[key] = value;
  }

  this.remove = (key) => {
    if (this.has(key)) {
      delete items[key];
      return true
    }
    return false;
  }

  this.get = key => this.has(key)
    ? items[key]
    : undefined;

  this.values = () => {
    var values = [];
    for (var k in items) {
      if (this.has(k)) {
        values.push(items[k])
      }
    }
    return values;
  }

  this.getItems = () => items;

  this.size = () => Object
    .keys(items)
    .length;

  this.clear = () => {
    items = {};
  };

  this.keys;

}
