<template>
	<div class="tree-transfer" :style="{width, height}">
		<div class="transfer-left">
			<h3 class="transfer-title">
				<el-checkbox
					:indeterminate="fromIsIndeterminate"
					v-model="fromCheckAll"
					@change="fromCheckAllBox"
				></el-checkbox>
				<span>{{fromTitle}}</span>
			</h3>
			<div class="transfer-content">
				<el-input
					v-if="filter"
					:placeholder="placeholder"
					v-model="filterFrom"
					size="small"
					class="filter-tree-transfer"
				></el-input>
				<el-tree
					ref="from-tree"
					show-checkbox
					:data="leftFromData"
					:node-key="nodeKey"
					:default-expanded-keys="fromExpandedKeys"
					:props="defaultProps"
					:filter-node-method="filterNodeTo"
					:default-expand-all="openAll"
					:render-content="renderContent"
					@check="fromTreeChecked"
				></el-tree>
			</div>
		</div>
		<div class="transfer-btn">
			<template v-if="buttonText">
				<p class="transfer-btn-item">
					<el-button
						type="primary"
						:disabled="fromDisabled"
						@click="addToTarget"
						icon="el-icon-arrow-right"
					>
						{{fromButtonText || '添加'}}
					</el-button>
				</p>
				<p class="transfer-btn-item">
					<el-button
						type="primary"
						:disabled="toDisabled"
						@click="removeToFrom"
						icon="el-icon-arrow-left"
					>
						{{toButtonText || '移除'}}
					</el-button>
				</p>
			</template>
			<template v-else>
				<p class="transfer-btn-item">
					<el-button
						type="primary"
						:disabled="fromDisabled"
						@click="addToTarget"
						icon="el-icon-arrow-right"
						circle
					></el-button>
				</p>
				<p class="transfer-btn-item">
					<el-button
						type="primary"
						:disabled="toDisabled"
						@click="removeToFrom"
						icon="el-icon-arrow-left"
						circle
					></el-button>
				</p>
			</template>
		</div>
		<div class="transfer-right">
			<h3 class="transfer-title">
				<el-checkbox
					:indeterminate="toIsIndeterminate"
					v-model="toCheckAll"
					@change="toCheckAllBox"
				></el-checkbox>
				<span>{{toTitle}}</span>
			</h3>
			<div class="transfer-content">
				<el-input
					v-if="filter"
					:placeholder="placeholder"
					v-model="filterTo"
					size="small"
					class="filter-tree-transfer"
				></el-input>
				<el-tree
					ref="to-tree"
					show-checkbox
					:data="rightToData"
					:node-key="nodeKey"
					:default-expanded-keys="toExpandedKeys"
					:props="defaultProps"
					:filter-node-method="filterNodeFrom"
					:default-expand-all="openAll"
					:render-content="renderContent"
					@check="toTreeChecked"
				></el-tree>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'TreeTransfer',
  props: {
    // 宽度
    width: {
      type: String,
      default: '100%'
    },
    // 高度
    height: {
      type: String,
      default: '320px'
    },
    // 列表文字
    title: {
      type: Array,
      default: () => ['源列表', '目标列表']
    },
    // 按钮文字
    buttonText: Array,
    // 数据来源
    fromData: {
      type: Array,
      default: () => []
    },
    // 选中数据
    toData: {
      type: Array,
      default: () => []
    },
    // 配置选项
    defaultProps: {
      type: Object,
      default: () => {
        return { label: 'label', children: 'children' }
      }
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    pid: {
      type: String,
      default: 'pid'
    },
    // 是否只返回子节点
    leafOnly: {
      type: Boolean,
      default: false
    },
    // 是否开启搜索功能
    filter: {
      type: Boolean,
      default: false
    },
    // 是否展开所有节点
    openAll: {
      type: Boolean,
      default: false
    },
    // 自定义节点数据函数
    renderContent: Function,
    // 穿梭后是否展开节点
    transferOpenNode: {
      type: Boolean,
      default: true
    },
    // 默认被选中节点(数据源)
    defaultCheckedKeys: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '输入关键字查询'
    },
    // 默认穿梭一次默认选中数据
    defaultTransfer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fromIsIndeterminate: false,				// 左侧是否半选
      fromCheckAll: false,							// 左侧是否全选
      toIsIndeterminate: false,					// 右侧是否半选
      toCheckAll: false,
      fromExpandedKeys: [],
      toExpandedKeys: [],
      leftFrom: [],
      rightTo: [],
      fromDisabled: true,
      toDisabled: true,
      fromCheckKeys: [],
      toCheckKeys: [],
      filterFrom: '',
      filterTo: ''
    }
  },
  created() {
    this.fromCheckKeys = this.defaultCheckedKeys
  },
  computed: {
    leftFromData() {
      const fromArray = [...this.fromData, ...this.leftFrom]
      fromArray.forEach(item => {
        item[this.pid] = 0
      })
      return fromArray
    },
    rightToData() {
      const toArray = [...this.toData, ...this.rightTo]
      toArray.forEach(item => {
        item[this.pid] = 0
      })
      return toArray
    },
    fromTitle() {
      const [title] = this.title
      return title
    },
    toTitle() {
      const [, title] = this.title
      return title
    },
    fromButtonText() {
      if (this.buttonText === undefined) {
        return
      }
      const [text] = this.buttonText
      return text
    },
    toButtonText() {
      if (this.buttonText === undefined) {
        return
      }
      const [, text] = this.buttonText
      return text
    }
  },
  methods: {
    addToTarget() {
      const keys = this.$refs['from-tree'].getCheckedKeys(this.leafOnly)
      const harfKeys = this.$refs['from-tree'].getHalfCheckedKeys()
      const arrayCheckedNodes = this.$refs['from-tree'].getCheckedNodes(this.leafOnly)
      const nodes = JSON.parse(JSON.stringify(arrayCheckedNodes))
      const arrayHalfCheckedNodes = this.$refs['from-tree'].getHalfCheckedNodes()
      const halfNodes = JSON.parse(JSON.stringify(arrayHalfCheckedNodes))

      const _children = this.defaultProps.children || 'children'
      const _pid = this.pid || 'pid'
      const _id = this['nodeKey'] || 'id'

      const rightToData = JSON.stringify(this.rigthToData)

      const skeletonHalfCheckedNodes = JSON.parse(JSON.stringify(arrayHalfCheckedNodes))

      const newSkeletonHalfCheckedNodes = []
      skeletonHalfCheckedNodes.forEach(item => {
        if (!inquireIsExist(item)) {
          newSkeletonHalfCheckedNodes.push(item)
        }
      })
      newSkeletonHalfCheckedNodes.forEach(item => {
        item[_children] = []
        if (item[_pid] === 0) {
          this.$refs['to-tree'].append(item)
        } else {
          this.$refs['to-tree'].append(item, item[_pid])
        }
      })
      const newSkeletonCheckedNodes = []
      nodes.forEach(item => {
        if (!inquireIsExist(item)) {
          newSkeletonCheckedNodes.push(item)
        }
      })
      newSkeletonCheckedNodes.forEach(item => {
        if (item[_children] && item[_children].length > 0) {
          item[_children] = []
          this.$refs['to-tree'].append(item, item[_pid])
        }
      })
      const leafCheckedNodes = arrayCheckedNodes.filter(item => !item[_children] || item[_children].length === 0)
      leafCheckedNodes.forEach(item => {
        if (!inquireIsExist(item)) {
          this.$refs['to-tree'].append(item, item[_pid])
        }
      })

      arrayCheckedNodes.forEach(item => {
        this.$refs['from-tree'].remove(item)
      })

      this.fromCheckKeys = []

      if (this.transferOpenNode) {
        this.toExpandedKeys = keys
      }

      this.$emit('addBtn', this.leftFromData, this.rigthToData, {
        keys,
        nodes,
        harfKeys,
        halfNodes
      })

      function inquireIsExist(item, strData = rightToData) {
        const strItem = typeof item[_id] === 'number'
          ? `'${_id}' : ${item[_id]},`
          : `'${_id}' : '${item[_id]}'`
        const reg = RegExp(strItem)
        const existed = reg.test(strData)
        return existed
      }
    },
    removeToFrom() {
      const keys = this.$refs['to-tree'].getCheckedKeys(this.leafOnly)
      const harfKeys = this.$refs['to-tree'].getHalfCheckedKeys()
      const arrayCheckedNodes = this.$refs['to-tree'].getCheckedNodes()
      const nodes = JSON.parse(JSON.stringify(arrayCheckedNodes))
      const arrayHalfCheckedNodes = this.$refs['to-tree'].getHalfCheckedNodes()
      const halfNodes = JSON.parse(JSON.stringify(arrayHalfCheckedNodes))

      const _children = this.defaultProps.children || 'children'
      const _pid = this.pid || 'pid'
      const _id = this['nodeKey'] || 'id'

      const leftFromData = JSON.stringify(this.leftFromData)
      const skeletonHalfCheckedNodes = JSON.parse(JSON.stringify(arrayHalfCheckedNodes))
      const newSkeletonHalfCheckedNodes = []
      skeletonHalfCheckedNodes.forEach(item => {
        if (!inquireIsExist(item)) {
          newSkeletonHalfCheckedNodes.push(item)
        }
      })
      newSkeletonHalfCheckedNodes.forEach(item => {
        item[_children] = []
        if (item[_pid] === 0) {
          this.$refs['from-tree'].append(item)
        } else {
          this.$refs['from-tree'].append(item, item[_pid])
        }
      })
      const newSkeletonCheckedNodes = []
      nodes.forEach(item => {
        if (!inquireIsExist(item)) {
          newSkeletonCheckedNodes.push(item)
        }
      })
      newSkeletonCheckedNodes.forEach(item => {
        if (item[_children] && item[_children].length > 0) {
          item[_children] = []
          this.$refs['from-tree'].append(item, item[_pid])
        }
      })
      const leafCheckedNodes = arrayCheckedNodes.filter(item => !item[_children] || item[_children].length === 0)
      leafCheckedNodes.forEach(item => {
        if (!inquireIsExist(item)) {
          this.$refs['from-tree'].append(item, item[_pid])
        }
      })

      arrayCheckedNodes.forEach(item => {
        this.$refs['to-tree'].remove(item)
      })

      this.toCheckKeys = []

      if (this.transferOpenNode) {
        this.toExpandedKeys = keys
      }

      this.$emit('removeBtn', this.leftFromData, this.rigthToData, {
        keys,
        nodes,
        harfKeys,
        halfNodes
      })

      function inquireIsExist(item, strData = leftFromData) {
        const strItem = typeof item[_id] === 'number'
          ? `'${_id}' : ${item[_id]},`
          : `'${_id}' : '${item[_id]}'`
        const reg = RegExp(strItem)
        const existed = reg.test(strData)
        return existed
      }
    },
    fromTreeChecked(nodeObj, treeObj) {
      this.fromCheckKeys = treeObj.checkedNodes
      this.$emit('left-check-change', nodeObj, treeObj)
    },
    toTreeChecked(nodeObj, treeObj) {
      this.toCheckKeys = treeObj.checkedNodes
      this.$emit('right-check-change', nodeObj, treeObj)
    },
    fromCheckAllBox(val) {
      if (this.leftFromData.length === 0) {
        return
      }
      if (val) {
        this.fromCheckKeys = this.leftFromData
        this.$refs['from-tree'].setCheckedNodes(this.leftFromData)
      } else {
        this.$refs['from-tree'].setCheckedNodes([])
        this.fromCheckKeys = []
      }
    },
    toCheckAllBox(val) {
      if (this.rightToData.length === 0) {
        return
      }
      if (val) {
        this.toCheckKeys = this.rightToData
        this.$refs['to-tree'].setCheckedNodes(this.rightToData)
      } else {
        this.$refs['to-tree'].setCheckedNodes([])
        this.toCheckKeys = []
      }
    },
    filterNodeFrom(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    filterNodeTo(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    }
  },
  watch: {
    fromCheckKeys(val) {
      if (val.length > 0) {
        this.fromDisabled = false
        this.fromIsIndeterminate = true

        const allCheck = val.filter(item => item[this.pid] === 0)
        if (allCheck.length === this.leftFromData.length) {
          this.fromIsIndeterminate = false
          this.fromCheckAll = true
        } else {
          this.fromIsIndeterminate = true
          this.fromCheckAll = false
        }
      } else {
        this.fromDisabled = true
        this.fromIsIndeterminate = false
        this.fromCheckAll = false
      }
    },
    toCheckKeys(val) {
      if (val.length > 0) {
        this.toDisabled = false
        this.toIsIndeterminate = true

        const allCheck = val.filter(item => item[this.pid] === 0)
        if (allCheck.length === this.rightToData.length) {
          this.toIsIndeterminate = false
          this.toCheckAll = true
        } else {
          this.toIsIndeterminate = true
          this.toCheckAll = false
        }
      } else {
        this.toDisabled = true
        this.toIsIndeterminate = false
        this.toCheckAll = false
      }
    },
    filterFrom(val) {
      this.$refs['from-tree'].filter(val)
    },
    filterTo(val) {
      this.$refs['from-tree'].filter(val)
    },
    defaultCheckedKeys(val) {
      if (val && this.defaultTransfer) {
        this.$nextTick(() => {
          this.addToTarget()
        })
      }
    }
  }
}
</script>

<style scoped>
.el-tree {
  min-width: 100%;
  display: inline-block !important;
}
.tree-transfer {
  position: relative;
  overflow: hidden;
}
.transfer-left {
  position: absolute;
  top: 0;
  left: 0;
}
.transfer-right {
  position: absolute;
  top: 0;
  right: 0;
}
.transfer-content {
  padding: 10px;
  height: calc(100% - 41px);
  box-sizing: border-box;
  overflow: auto;
}
.transfer-left,
.transfer-right {
  border: 1px solid #ebeef5;
  width: 40%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  vertical-align: middle;
}
.transfer-btn {
  position: absolute;
  top: 50%;
  left: 40%;
  width: 20%;
  transform: translateY(-50%);
  text-align: center;
}
.transfer-btn-item {
  padding: 10px;
  overflow: hidden;
}
.transfer-title {
  border-bottom: 1px solid #ebeef5;
  padding: 0 15px;
  height: 40px;
	margin: 0;
  line-height: 40px;
  color: #333;
  font-size: 16px;
  background-color: #f5f7fa;
}
.transfer-title .el-checkbox {
  margin-right: 10px;
}
.filter-tree-transfer {
  margin-bottom: 10px;
}
</style>
