项目技术栈vue-elementUI-admin，其导出Excel功能只适用于一级表头，不适用于多级表头不符合需求，我将Export2Excel代码作出了部分修改，增加了：

- 二级表头
- 合并表头单元格
- 合计

首先下载

```powershell
    npm install -S file-saver xlsx
    npm install -D script-loader
```

这里我将Blob和Export2Excel放到了文件夹lib中

**以下是个人修改新增功能说明！只需要js文件的直接下载即可！**

------

我将基于功能需求封装的toExcel文件放在了utils中，可自行参考

使用：在.vue文件中

```javascript
import exportExcel from '@/utils/toExcel.js'

export default = {
    methods: {
        // 点击导出Excel, [r]标识表示必传参数
        click() {
            exportExcel({
                tHeader: [],    // 一级表头显示文字[r]，如：[姓名, 年龄, 性别, 分数]
                filterVal: [],  // 一级表头数据字段[r]，如：[name, age, gender, score]
                multiHeader: [],// 二级表头显示文字   ，如：['', '详情', '', '']
                tabledata: [],  // 表格数据[r]       ，如：传入要导出的数据
                sums: [],       // 表格合计          ，如：['合计', '', '', 100]
                title: ''       // 导出的Excel文件名，默认为Excel
            })
        }
    }
}
```

最终导出为


<table>
    <thead>
        <tr>
            <th rowspan="2" style='text-align:center;' >姓名</th>
            <th colspan="3" style='text-align:center;' >详情</th>
        </tr>
        <tr>
        	<th style='text-align:center;' >年龄</th>
            <th style='text-align:center;' >性别</th>
            <th style='text-align:center;' >分数</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style='text-align:center;' >小明</td>
            <td style='text-align:center;' >18</td>
            <td style='text-align:center;' >男</td>
            <td style='text-align:center;' >100</td>
        </tr>
        <tr>
            <td style='text-align:center;' >合计</td>
            <td style='text-align:center;' >&nbsp;</td>
            <td style='text-align:center;' >&nbsp;</td>
            <td style='text-align:center;' >100</td>
        </tr>
    </tbody>
</table>


 
**注意**

1. `[r]`表示必传参数
2. 表头文字`tHeader`与数据字段`filterVal`要一一对应
3. 如传入二级表头`multiHeader`，除其包含的第一个子表头对应为文本外，其余表头全部为`''`，导出会合并表头单元格

   如实现下表格，则`multiHeader: ['', '详情', '其他', '']`
    
    <table>
        <thead>
            <tr>
                <th rowspan="2" style='text-align:center;' >姓名</th>
                <th style='text-align:center;' >详情</th>
                <th colspan="2" style='text-align:center;' >其他</th>
            </tr>
            <tr>
                <th style='text-align:center;' >年龄</th>
                <th style='text-align:center;' >性别</th>
                <th style='text-align:center;' >分数</th>
            </tr>
        </thead>
    </table>

4. 合计`sums`为对应列数据的合计，无需合计的项使用`''`
5. 表格如使用elementUI序号索引功能，传入的`tHeader`和`filterVal`应将序号项去掉
6. `tHeader`、`filterVal`、`multiHeader`、`sums`的长度应一致
