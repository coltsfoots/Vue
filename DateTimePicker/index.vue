<template>
	<el-date-picker
    v-model="dateValue"
		range-separator="至"
    unlink-panels
		start-placeholder="开始日期"
		end-placeholder="结束日期"
    size="small"
		:placeholder="placeholder"
		:format="formatValueType"
		:type="type"
		:value-format="isWithTime"
		:isWithShortcut="isWithShortcut"
		:picker-options="shortcuts"
		@change="changeHandle"
	>
	</el-date-picker>
</template>

<script>
export default {
  name: 'DateTimePicker',
  props: {
    type: {
      type: String,
      default: ''
    },
    isWithShortcut: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dateValue: ''
    }
  },
  computed: {
    formatValueType() {
      const type = this.$props.type
      if (type === 'date' || type === 'daterange' || type === 'dates') {
        return 'yyyy年MM月dd日'
      } else if (type === 'datetime' || type === 'datetimerange') {
        return 'yyyy-MM-dd HH:mm:ss'
      } else if (type === 'year') {
        return 'yyyy年'
      } else if (type === 'month') {
        return 'yyyy年MM月'
      } else {
        if (process.env.NODE_ENV === 'development') {
          return this.$message({
            type: 'error',
            showClose: true,
            duration: 0,
            message: '传入参数错误: type is not null'
          })
        } else {
          return new Error('传入参数错误: type is not null')
        }
      }
    },
    isWithTime() {
      const type = this.$props.type
      if (type === 'date' || type === 'daterange' || type === 'dates' || type === 'year' || type === 'month') {
        return 'yyyy-MM-dd'
      } else if (type === 'datetime' || type === 'datetimerange') {
        return 'yyyy-MM-dd HH:mm:ss'
      } else {
        if (process.env.NODE_ENV === 'development') {
          return this.$message({
            type: 'error',
            showClose: true,
            duration: 0,
            message: '传入参数错误: type is wrong'
          })
        } else {
          return new Error('传入参数错误: type is wrong')
        }
      }
    },
    placeholder() {
      if (this.$props.type === 'year') {
        return '选择年'
      } else if (this.$props.type === 'month') {
        return '选择月'
      } else {
        return '选择日期'
      }
    },
    shortcuts() {
      if (this.$props.isWithShortcut && this.$props.type.indexOf('range') === -1) {
        return {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        }
      } else if (this.$props.isWithShortcut && this.$props.type.indexOf('range') !== -1) {
        return {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const start = new Date()
              const end = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const start = new Date()
              const end = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const start = new Date()
              const end = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    }
  },
  methods: {
    changeHandle(val) {
      this.$emit('handleChangeDate', val)
    }
  }
}
</script>
