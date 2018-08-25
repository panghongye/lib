module.exports = class ArrayToTree {
  /**
   * @param {Array} data 入口参数data,平行数组
   * @param {String} key id字段
   * @param {String} parentKey 父字段
   * @param {*} map 需要将原始属性名称转换为什么名称
   */
  constructor(data, key, parentKey, map) {
    this.data = data
    this.key = key
    this.parentKey = parentKey
    this.treeParentKey = parentKey //parentKey要转换成什么属性名称
    this.treeKey = key //key要转换成什么属性名称
    this.map = map
    if (map) {
      if (map[key]) this.treeKey = map[key]
    }
  }
  _copy(item) {
    var _temp = {
      children: [],
    }
    _temp[this.treeKey] = item[this.key]
    for (var _index in item) {
      // if (_index != this.key && _index != this.parentKey) {
      var _property = item[_index]
      if (!!this.map && this.map[_index]) _temp[this.map[_index]] = _property
      else _temp[_index] = _property
      // }
    }
    return _temp
  }
  toTree() {
    var data = this.data
    var pos = {}
    var tree = []
    var i = 0
    while (data.length != 0) {
      if (data[i][this.parentKey] == 0) {
        var _temp = this._copy(data[i])
        tree.push(_temp)
        pos[data[i][this.key]] = [tree.length - 1]
        data.splice(i, 1)
        i--
      } else {
        var posArr = pos[data[i][this.parentKey]]
        if (posArr != undefined) {
          var obj = tree[posArr[0]]
          for (var j = 1; j < posArr.length; j++) {
            obj = obj.children[posArr[j]]
          }
          var _temp = this._copy(data[i])
          obj.children.push(_temp)
          pos[data[i][this.key]] = posArr.concat([obj.children.length - 1])
          data.splice(i, 1)
          i--
        }
      }
      i++
      if (i > data.length - 1) {
        i = 0
      }
    }
    return tree
  }
}
//使用示例，data需要有key parentKey属性，其它属性内容没有限制。
var data = [
  { id: 1, parent: 0, text: 'A' },
  { id: 2, parent: 4, text: 'B' },
  { id: 3, parent: 7, text: 'C' },
  { id: 4, parent: 1, text: 'D' },
  { id: 5, parent: 0, text: 'E' },
  { id: 6, parent: 5, text: 'B' },
  { id: 7, parent: 4, text: 'F' },
]
//简单使用
var tree = new ArrayToTree(data, 'id', 'parent')
console.log(tree.toTree())

//带属性名称转换
data = [
  { id: 1, parent: 0, text: 'A' },
  { id: 2, parent: 4, text: 'B' },
  { id: 3, parent: 7, text: 'C' },
  { id: 4, parent: 1, text: 'D' },
  { id: 5, parent: 0, text: 'E' },
  { id: 6, parent: 5, text: 'B' },
  { id: 7, parent: 4, text: 'F' },
]
var tree1 = new ArrayToTree(data, 'id', 'parent', { text: 'title', id: 'id0' })
console.log(tree1.toTree())
