# Vue
Vue相关
emmm不知道为嘛不能格式化代码，等我研究好了再格式化吧o(╥﹏╥)o

# 更新几个自己简单封装的组件，基于Element-UI

## Form-Table-Pagination

用下面三个组件组合成一个组件，不影响其他三个组件单独使用

### 使用
直接复制代码到项目中，然后导入，即可使用

示例：

    import FormTablePagination from '@/components/FormTablePagination'
    <template>
        <form-table-pagination :config="config"></form-table-pagination>
    </template>
    <script>
        export default {
            components: {
                FormTablePagination
            }
        }
    </script>
    
#### 参数说明

config 为组件配置对象，具体配置如下：

> config参数配置

参数 | 说明 | 参数类型 | 是否必填 | 默认值
--------- | --------- | --------- | --------- | ---------
formOptions | 表单元素配置选项，详细配置参考 form 配置 | Object | 是 | -
tableOptions | 表格配置选项，详细配置参考 table 配置 | Object | 是 | - 
page | 分页配置选项，详细配置参考 pagination 配置 | Object | 是 | -

## 表格

### 使用
直接复制代码到项目中，然后导入，即可使用

示例：

    import CustomTable from '@/components/CustomTable'
    <template>
        <custom-talbe :tableOptions="tableOptions"></custom-table>
    </template>
    <script>
        export default {
            components: {
                CustomTable
            }
        }
    </script>
    
#### 参数说明

tableOptions 为组件配置对象，详细配置如下：

> table参数配置

参数 | 说明 | 参数类型 | 是否必填 | 默认值
--------- | --------- | --------- | --------- | ---------
data | 表格数据源 | Array | 是 | -
columns | 表格表头源(详细配置见下面) | Array | 是 | -
hasSelection | 是否有选择框 | Boolean | 否 | false
hasIndex | 是否有序号 | Boolean | 否 | false
maxHeight | 表格最大高度 | String,Number | 否 | 520
stripe | 是否斑马表格 | Boolean | 否 | false
border | 表格是否有边框 | Boolean | 否 | true
size | 表格尺寸 | String | 否 | small
highlightCurrentRow | 是否高亮当前行 | Boolean | 否 | false
showSummary | 是否有合计行 | Boolean | 否 | false
commitSelectionChange | 选择框表格在选择项发生改变时调用的方法(接收被选择项的数据) | Function | 否 | -

> columns参数配置

参数 | 说明 | 参数类型 | 是否必填 | 默认值
--------- | --------- | --------- | --------- | ---------
label | 表头展示标题 | String | 否 | -
prop | 表头字段名称 | String | 是 | -
minWidth | 最小宽度 | String,Number | 否 | -
fixed | 是否固定 | String,Boolean | 否 | -
formatter | 内容格式化 | Function | 否 | -

> 表格操作栏
如需在每一行单独增加操作按钮，需要在组件内使用插槽
示例：

    <custom-table :tableOptions="tableOptions">
        <template slot="handle-column">
            <el-table-column slot-scope="scope" label="操作">
                <el-button type="primary">操作每一行</el-button>
            </el-table-column>
        </template>
     </custom-table>
     
 监听含有选择框表格的勾选事件，需要在父组件定义自定义事件：
 
    <custom-table
	    @commitSelectionChange="commitSelectionChange"
        :tableOptions="tableOptions"
	>
    </custom-table> 
    <script>
    export default {
        methods: {
            // 方法接收一个数组(被勾选的当前行)
            commitSelectionChange(selectionArr){
                console.log(selectionArr)
            }
        }
    }
    </script>

## 表单

### 使用
直接复制代码到项目中，然后导入，即可使用

示例：

    import CustomForm from '@/components/CustomForm'
    <template>
        <custom-form :formOptions="formOptions"></custom-form>
    </template>
    <script>
        export default {
            components: {
                CustomForm
            }
        }
    </script>
    
#### 参数说明

formOptions 为组件配置对象，详细配置如下：

> form参数配置

参数 | 说明 | 参数类型 | 是否必填 | 默认值
--------- | --------- | --------- | --------- | ---------
formName | 表单名 | String | 是 | -
showResthBtn | 是否显示重置按钮 | Boolean | 否 | -
handleSubmit | 表单提交回调方法(接受表单数据对象为参数) | Function | 否 | -
inline | 表单布局方式 | Boolean | 否 | false
rules | 表单验证规则 | Object | 否 | -
labelPosition | 表单对齐方式 | String | 否 | -
labelWidth | 表单字段说明宽度 | String,Number | 否 | true
inlineMessage | 是否在同一行展示验证信息 | Boolean | 否 | -
size | 表单元素尺寸 | String | 否 | -
forms | 表单元素配置对象(详情配置如下) | Object | 是 | -

> forms参数配置

参数 | 说明 | 参数类型 | 是否必填 | 默认值
--------- | --------- | --------- | --------- | ---------
itemType | 表单元素类型 | String | 是 | input(目前只接受4种类型 input select date daterange)
prop | 表单元素字段名 | String | 是 | -
label | 元素说明 | String | 否 | -
itemWidth | 元素宽度 | String,Number | 否 | -
size | 元素尺寸 | String | 否 | -
placeholder | 占位符 | String | 否 | -
disabled | 是否禁用元素 | Boolean | 否 | false
readonly | 是否只读 | Boolean | 否 | false
options | 下拉框选项配置 | Array | 是 | -
pickerOptions | 日期范围快捷选项 | Object | 否 | 只有在类型为 daterange 的时候才有效

## 分页

### 使用
直接复制代码到项目中，然后导入，即可使用

示例：

    import Pagination from '@/components/Pagination'
    <template>
        <pagination :page="page"></pagination>
    </template>
    <script>
        export default {
            components: {
                Pagination
            }
        }
    </script>
    
#### 参数说明

page 为分页组件配置对象，具体配置如下：

> page参数配置

参数 | 说明 | 参数类型 | 是否必填 | 默认值
--------- | --------- | --------- | --------- | ---------
small | 表格尺寸大小 | String | 否 | -
pageIndex | 当前页 | Number | 是 | 1
pageSize | 每一页展示条数 | Number | 是 | 20
totalPage | 总条数 | Number | 否 | -
pageSizes | 规定每页展示条数 | Array | 否 | [20, 50, 100, 150, 200]
prevText | 上一页按钮显示文字 | String | 否 | 上一页
nextText | 下一页按钮显示文字 | String | 否 | 下一页

若要监听当前页改变、或者每页展示条数改变事件，需要在父组件定义监听事件

    <pagination @currentChange="eventName"></pagination>
    
eventName 为你自己定义的事件名字

## 日期选择器

### 使用
直接复制代码到项目中，然后导入，即可使用

示例：

    import DateTimePicker from '@/comoponents/DateTimePicker'
    <template>
		<date-time-picker :type="type" :isWithShortcut="isWithShortcut"></date-time-picker>
	</template>
	<script>
		export default {
			components: {
				DateTimePicker
			}
	    }
    </script>
	
### 参数说明

type 为日期选择器类型，支持element-ui所有类型，isWithShortcut 为是否带快捷方式

>参数配置

参数 | 说明 | 参数类型 | 是否必填 | 默认值
--------- | --------- | --------- | --------- | ---------
type | 日期类型 | String | 是 | date
isWithShortcut | 是否带快捷方式 | Boolean | 否 | false

监听日期发生改变的值需要在父组件定义事件

    <date-time-picker @handleChangeDate="eventName"></date-time-picker>
    
eventName 为自定义事件名

	































