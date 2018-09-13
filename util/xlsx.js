import XLSX from 'xlsx'

var tmpDown //导出的二进制对象

function downloadExcel(json, type = 'xlsx') {
  //创建二进制对象写入转换好的字节流
  tmpDown = new Blob(
    [
      s2ab(
        XLSX.write(
          {
            SheetNames: ['mySheet'], //保存的表标题
            Sheets: { mySheet: XLSX.utils.json_to_sheet(json) },
          },
          {
            bookType: type,
            bookSST: false,
            type: 'binary',
          } //这里的数据是用来定义导出的格式类型
        )
      ),
    ],
    { type: '' }
  )

  var href = URL.createObjectURL(tmpDown)
  let a = document.createElement('a')
  a.href = href
  a.download = `奖品兑换 ${new Date().toLocaleString()}.${type}`
  a.click()

  //延时释放
  setTimeout(function() {
    URL.revokeObjectURL(tmpDown)
  }, 100)
}

//字符串转字符流
function s2ab(s) {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}

export default downloadExcel
