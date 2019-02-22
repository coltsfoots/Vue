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
columns | 表格表头源 | Array | 是 | -
maxHeight | 表格最大高度 | String,Number | 否 | 520

