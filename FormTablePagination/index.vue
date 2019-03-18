<template>
	<div>
		<template :config="config">
			<custom-form :formOptions="config.formOptions"></custom-form>
			<custom-table
        :tableOptions="config.tableOptions"
        @commitSelectionChange="commitSelectionChange"
      >
        <!-- 操作列 -->
        <template slot="handle-column">
          <slot name="handle-column"></slot>
        </template>
      </custom-table>
			<pagination
        :page="config.page"
        @currentChange="currentChange"
      ></pagination>
		</template>
	</div>
</template>

<script>
import CustomForm from '@/components/CustomForm'
import CustomTable from '@/components/CustomTable'
import Pagination from '@/components/Pagination'
export default {
  name: 'FormTablePagination',
  components: {
    CustomForm,
    CustomTable,
    Pagination
  },
  props: {
    config: Object
  },
  data() {
    const { forms } = this.config.formOptions
    const formParams = {}
    forms.map(item => {
      const propType = typeof item.prop
      if (propType === 'string') {
        formParams[item.prop] = ''
      } else {
        throw new Error(`Prop's type must be a String`)
      }
    })
    return {
      formParams
    }
  },
  created() {
    // console.log(this)
  },
  methods: {
    handleResetForm() {
      this.$refs[this.formName].resetFields()
    },
    handleSearch() {
      this.getParams((error, formparams) => {
        if (!error) {
          const { handleSubmit } = this.config.formOptions
          if (handleSubmit) {
            handleSubmit(formparams)
          }
        }
      })
    },
    getParams(callback) {
      this.$refs[this.formName].validate(valid => {
        if (valid) {
          if (callback) {
            callback(null, this.formParams)
          }
        }
      })
    },
    currentChange() {
      const { currentChange } = this.config.page
      if (currentChange) {
        currentChange()
      }
    },
    commitSelectionChange(val) {
      const { commitSelectionChange } = this.config.tableOptions
      if (commitSelectionChange) {
        commitSelectionChange(val)
      }
    }
  }
}
</script>

<style scoped>

</style>
