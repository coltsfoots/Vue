<template>
	<div>
		<el-table
			:tableOptions="tableOptions"
			:data="tableOptions.dataSource"
			:columns="tableOptions.columns"
			:max-height="tableOptions.maxHeight || '525'"
			:stripe="tableOptions.stripe"
			:border="tableOptions.border ? tableOptions.border: true"
			:size="tableOptions.size ? tableOptions.size : 'small'"
			:highlight-current-row="tableOptions.highlightCurrentRow"
			:show-summary="tableOptions.showSummary"
			@selection-change="handleSelectionChange"
		>
			<!-- 复选框 -->
			<el-table-column
				v-if="tableOptions.hasSelection"
				type="selection"
				width="55"
				:fixed="hasFixed"
				resizable
			></el-table-column>

			<!-- 序号 -->
			<el-table-column
				v-if="tableOptions.hasIndex"
				type="index"
				width="55"
				:fixed="hasFixed"
				resizable
			>
				<template slot="header">
					<span>序号</span>
				</template>
			</el-table-column>

			<!-- 动态表头渲染 -->
			<el-table-column
				v-for="(column, i) in tableOptions.columns"
				show-overflow-tooltip
				:key="i"
				:label="column.label"
				:prop="column.prop"
				:min-width="column.minWidth"
				:fixed="column.fixed"
				:formatter="column.formatter ? column.formatter : null"
			></el-table-column>

			<!-- 操作列 -->
			<slot name="handle-column"></slot>
		</el-table>
	</div>
</template>

<script>
import { tableOptions } from './tableOptions'
export default {
  name: 'CustomTable',
  props: {
    tableOptions: Object,
    default: () => tableOptions
  },
  computed: {
    hasFixed() {
      const { columns } = this.tableOptions
      const fixed = columns.some(item => {
        if (item.fixed) {
          return true
        } else {
          return false
        }
      })
      return fixed
    }
  },
  methods: {
    handleSelectionChange(item) {
      this.$emit('commitSelectionChange', item)
    }
  }
}
</script>

<style scoped>

</style>
