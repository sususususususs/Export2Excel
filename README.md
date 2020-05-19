项目使用技术栈vue-elementUI-admin，其自带导出Excel功能，但只适用于导出一级表头，不适用于导出多级表头，不符合需求，我这里将Export2Excel源码作出了部分修改，增加了：

- 二级表头
- 合并表头单元格
- 合计

首先，需要下载

> npm install -S file-saver xlsx
> npm install -D script-loader

然后将Blob.js和Export2Excel.js放到项目文件目录下，我这里将这两个文件都放到了lib文件夹下

** 如果只需要Export2Excel和Blob文件可以不用往下看了，直接下载即可 **

toExcel.js是我封装的一个导出的方法，放在了utils文件下

使用：在需要导出Excel表格的.vue文件中

```javascript
import exportExcel from '@/utils/toExcel.js'

export default = {
    methods: {
        // 点击按钮导出Excel
        click() {
            exportExcel({
                // 与数据绑定的表头的label
                tHeader: [],
                // 与数据绑定的表头的prop
                filterVal: [],
                // 与数据绑定无关的表头的label
                multiHeader: [],
                // 表格数据
                tabledata: [],
                // 表格合计
                sums: [],
                title: ''
            })
        }
    }
}
```

##### tHeader:[]

与数据绑定的表头label，如：['日期'，'姓名'，'性别'，'住址'，'爱好'，'状态']

##### filterVal:[]

与数据绑定的表头prop，如：['date', 'name', 'gender', 'address', 'hobby', 'status']，与数据字段和表头label一一对应

##### multiHeader:[]

`可选`
与数据绑定无关的表头label，多级表头会形成嵌套关系，比如表头有日期、姓名、性别、详情，在详情下面有住址、爱好、状态等
在multiHeader中传入['', '', '', '详情','', '']即可

multiHeader、filterVal、tHeader的长度是一致的，日期、姓名、性别没有一级表头的用''，而住址，爱好，状态属于同一个一级表头，在第一个住址传入一级表头的label，后面的用''即可，导出的Excel会将住址、爱好、状态的一级表头合并为一个单元格

##### tabledata:[]

要导出的数据，也就是与表格绑定的数据，直接传进来即可，如： {date: xxxx,name: '小明', ...}

##### sums:[]

可选，部分表格下面有对上面数据的合计，需要传入统计好的数据数组，要与前面的数组长度一致，缺少的项用空字符串占位

##### title

导出数据的Excel文件的名字。默认为Excel

> 注意： 表格使用elementUI的索引序号功能的，在表头的label和filterVal中要把序号所对应的那项去掉
