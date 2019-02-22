# Vue
Vue相关

# 更新几个自己简单封装的组件，基于Element-UI

## 表格

### 使用
直接复制代码到项目中，然后导入，即可使用

示例：

    import CustomTable from '@/components/CustomTable'
    <template>
        <custom-talbe :tableOptions="tableOptions"></custom-table>
    </template>
    
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
handleSelectionChange | 表格选择项发生变化时挑用的方法(仅对含有选择框的表格生效) | Function | 否 | -

> columns参数配置

参数 | 说明 | 参数类型 | 是否必填 | 默认值
--------- | --------- | --------- | --------- | ---------
label | 表头展示标题 | String | 否 | -
prop | 表头字段名称 | String | 是 | -
minWidth | 最小宽度 | String,Number | 否 | -
fixed | 是否固定 | String,Boolean | 否 | -
formatter | 内容格式化 | Function | 否 | -

> 表格操作栏
如需在每一行单独增加操作按钮，需要在组件内使用模板插值
示例：

    <custom-table :tableOptions="tableOptions">
        <template slot="handle-column">
            <el-table-column slot-scope="scope" label="操作">
                <el-button type="primary">操作每一行</el-button>
            </el-table-column>
        </template>
     </custom-table>

## 表单

### 使用
直接复制代码到项目中，然后导入，即可使用

示例：

    import CustomForm from '@/components/CustomForm'
    <template>
        <custom-form :formOptions="formOptions"></custom-form>
    </template>
    
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
