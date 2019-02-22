export const tableOptions = {
  dataSource: Array,
  columns: Array,
  hasSelection: Boolean,
  hasIndex: Boolean,
  maxHeight: [String, Number],
  stripe: Boolean,
  border: Boolean,
  size: {
    type: String,
    validate: validateSize
  },
  highlightCurrentRow: Boolean,
  showSummary: Boolean
}

function validateSize(value) {
  const sizeType = ['large', 'small', 'mini']
  const valid = sizeType.indexOf(value.toLowerCase()) !== -1 || value === ''
  if (!valid) {
    throw new Error(`Size must be one of ['large', 'small', 'mini']`)
  }
  return valid
}
