<template>
	<div class="pagination-container">
		<el-pagination
			background
      v-if="page.totalPage"
      :small="page.isSmall"
      :current-page.sync="page.pageIndex || 1"
			:page-size='page.pageSize || 20'
			:total='totalPage'
			:page-sizes='page.pageSizes || [20, 50, 100, 150, 200]'
      :prev-text='page.prevText'
      :next-text='page.nextText'
			:layout='page.layout|| "prev, pager, next"'
      @current-change="currentChangeHandle"
      @size-change="sizeChangeHandle"
		>
		</el-pagination>
	</div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: Object
  },
  computed: {
    totalPage() {
      return this.page.totalPage
    },
    // 判断是否获取数据失败
    initBack() {
      return this.page.totalPage / this.page.pageSize < this.page.pageIndex
    }
  },
  watch: {
    totalPage() {
      if (this.initBack) {
        this.page.pageIndex -= 1
        this.$emit('currentChange')
      }
    }
  },
  methods: {
    currentChangeHandle(curr) {
      this.page.pageIndex = curr
      this.$emit('currentChange')
    },
    sizeChangeHandle(size) {
      this.page.pageSize = size
      this.$emit('currentChange')
    }
  }
}
</script>

<style lang="less" scoped>
.pagination-container{
  display: block;
  margin: 20px 0 0;
  .el-pagination{
    text-align: center;
  }
}
</style>
