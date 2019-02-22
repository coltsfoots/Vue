# Vue
Vue相关

# 更新几个自己简单封装的组件，基于Element-UI

> 表格

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
handleSelectionChange | 表格选择项发生变化时挑用的方法(仅对含有选择框的表格生效) | Function | -

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

    <template slot="handle-column">
        <el-table-column slot-scope="scope" label="操作">
            <el-button type="primary">操作每一行</el-button>
        </el-table-column>
    </template>

