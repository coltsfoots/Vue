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
    :value-format="isWithTime"
		:type="type"
    :hasShortcuts="hasShortcuts"
		:picker-options="pickerOptions ? pickerOptions : hasShortcuts ? defaultPickerOptions : {}"
    :readonly="readonly"
    :disabled="disabled"
    :default-value="defaultValue ? defaultValue : ''"
    :default-time="defaultTime ? defaultTime : ''"
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
    // 是否开启快捷方式
    hasShortcuts: {
      type: Boolean,
      default: false
    },
    pickerOptions: Object,
    readonly: Boolean,
    disabled: Boolean,
    defaultValue: String,
    defaultTime: String
  },
  data() {
    let defaultPickerOptions = {}
    if (this.type.indexOf('range') === -1) {
      defaultPickerOptions = Object.assign(defaultPickerOptions, {
        shortcuts: [
          {
            text: '今天',
            onClick(vm) {
              vm.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(vm) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              vm.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(vm) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              vm.$emit('pick', date)
            }
          }
        ]
      })
    } else if (this.type.indexOf('range') !== -1) {
      defaultPickerOptions = Object.assign(defaultPickerOptions, {
        shortcuts: [
          {
            text: '最近一周',
            onClick(vm) {
              const start = new Date()
              const end = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              vm.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(vm) {
              const start = new Date()
              const end = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              vm.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(vm) {
              const start = new Date()
              const end = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 3)
              vm.$emit('pick', [start, end])
            }
          }
        ]
      })
    }
    return {
      dateValue: '',
      defaultPickerOptions
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
    }
  },
  methods: {
    changeHandle(val) {
      this.$emit('handleChangeDate', val)
    }
  },
  created() {
    console.log(this)
  }
}
</script>
