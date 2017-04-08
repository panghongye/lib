function Set() {
    var items = {};
    // this.has = (value) => value in items
    this.has = (value) => items.hasOwnProperty(value)

}