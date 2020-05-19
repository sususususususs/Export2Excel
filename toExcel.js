function formatJson(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]))
}

function exportExcel(params) {
  const {
    tHeader, // 第二行表头文字Array
    filterVal, // 第二行表头字段Array
    multiHeader, // 第一行表头文字Array
    tabledata, // 数据
    sums, // 合计
    title = 'Excel' // 文件名
  } = params
  require.ensure([], () => {
    const { export_json_to_excel } = require('@/lib/Export2Excel')
    const data = formatJson(filterVal.flat(Infinity), tabledata)
    sums && data.push(sums)
    const merges = []
    const arr = []
    multiHeader.forEach((v, i) => v !== '' && arr.push(i))
    for (let i = 0; i < arr.length - 1; i++) {
      merges.push({
        s: {
          c: arr[i],
          r: 0
        },
        e: {
          c: arr[i + 1] - 1,
          r: 0
        }
      })
    }
    export_json_to_excel(multiHeader, tHeader.flat(Infinity), data, title, merges)
  })
}

export default exportExcel
