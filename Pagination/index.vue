<template>
	<div class="pagination-container">
		<el-pagination
			background
      v-if="page.totalPage"
      :small="page.isSmall"
      :current-page.sync="page.pageIndex"
			:page-size='page.pageSize'
			:total='page.totalPage'
			:page-sizes='page.pageSizes || [20, 50, 100, 150, 200]'
      :prev-text='page.prevText || "上一页"'
      :next-text='page.nextText || "下一页"'
			layout='total, sizes, prev, pager, next, jumper'
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
    page: {
      type: Object,
      default: () => ({
        pageIndex: 1,
        pageSize: 20
      })
    }
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
  created() {
    console.log(this)
  },
  methods: {
    currentChangeHandle(curr) {
      this.page.pageIndex = curr
      console.log(curr)
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
