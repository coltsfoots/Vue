<template>
	<div>
		<el-form
			:formOptions="formOptions"
			:ref="formOptions.formName"
			v-if="formOptions.forms"
			:model="formParams"
			:inline="formOptions.inline"
			:rules="formOptions.rules || {}"
			:label-position="formOptions.labelPosition || 'right'"
			:label-width="formOptions.labelWidth || 80 + 'px'"
			:inline-message="formOptions.inlineMessage"
			:size="formOptions.size"
			@submit.native.prevent="handleSearch()"
		>
			<el-form-item
				v-for="(form, i) in formOptions.forms"
				:key="i"
				:prop="form.prop"
				:label="form.label"
				:label-width="form.itemWidth + 'px'"
				:size="form.size ? form.size : formOptions.size"
			>
				<!-- 输入框 -->
				<el-input
					v-if="form.itemType === 'input' || form.itemType === undefined"
					:placeholder="form.placeholder"
					:disabled="form.disabled"
					:readonly="form.readonly"
					v-model="formParams[form.prop]"
				></el-input>

				<!-- 下拉框 -->
				<el-select
					v-if="form.itemType === 'select'"
					v-model="formParams[form.prop]"
				>
					<el-option
						v-for="option in form.options"
						:placeholder="form.placeholder"
						:disabled="form.disabled"
						:key="option.label"
						:value="option.value"
						:label="option.label"
					></el-option>
				</el-select>
				<!-- 时间框 -->
				<el-date-picker
					v-else-if="form.itemType === 'date'"
					type="date"
					format="yyyy年MM月dd日"
					value-format="yyyy-MM-dd"
					:placeholder="form.placeholder"
					:disabled="form.disabled"
					:readonly="form.readonly"
					:size="form.size ? form.size : formOptions.size"
					:picker-options="form.pickerOptions || {}"
					v-model="formParams[form.prop]"
				></el-date-picker>
				<el-date-picker
					v-else-if="form.itemType === 'daterange'"
					type="daterange"
					format="yyyy年MM月dd日"
					value-format="yyyy-MM-dd"
					range-separator="至"
					:placeholder="form.placeholder"
					:disabled="form.disabled"
					:readonly="form.readonly"
					:size="form.size ? form.size : formOptions.size"
					:picker-options="form.pickerOptions || {}"
					v-model="formParams[form.prop]"
				></el-date-picker>
			</el-form-item>
			<el-form-item label="">
				<el-button
					type="primary"
					@click="handleSearch"
				>查询</el-button>
				<el-button
					v-if="formOptions.showResetBtn"
					@click.native="handleResetForm"
				>重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { formOptions } from './formOptions'
export default {
  name: 'SearchForm',
  props: {
    formOptions: Object,
    default: () => formOptions
  },
  data() {
    const { forms } = this.formOptions
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
  methods: {
    handleResetForm() {
      this.$refs[this.formOptions.formName].resetFields()
    },
    handleSearch() {
      this.getParams((error, formparams) => {
        if (!error) {
          const { handleSubmit } = this.formOptions
          if (handleSubmit) {
            handleSubmit(formparams)
          }
        }
      })
    },
    getParams(callback) {
      this.$refs[this.formOptions.formName].validate(valid => {
        if (valid) {
          if (callback) {
            callback(null, this.formParams)
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
