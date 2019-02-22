export const formOptions = {
  formName: {
    type: String,
    required: true
  },
  showResthBtn: Boolean,
  handleSubmit: Function,
  inline: {
    type: Boolean,
    default: false
  },
  rules: {
    type: Array,
    default: () => {}
  },
  labelPosition: String,
  labelWidth: [String, Number],
  inlineMessage: Boolean,
  size: {
    type: String,
    validate: validateSize
  },
  forms: {
    type: Object,
    prop: {
      type: String,
      required: true
    },
    label: String,
    itemWidth: [String, Number],
    size: {
      type: String,
      validate: validateSize
    },
    itemType: {
      type: String,
      validate: validateType
    },
    placeholder: String,
    disabled: Boolean,
    readonly: Boolean,
    options: Array,
    pickerOptions: Object
  }
}

function validateType(value) {
  const itemTypes = ['input', 'selection', 'date', 'daterange']
  const valid = itemTypes.indexOf(value.toLowerCase()) !== -1 || value === ''
  if (!valid) {
    throw new Error(`itemType is must be one of ['input', 'selection', 'date', 'daterange']`)
  } else {
    return valid
  }
}

function validateSize(value) {
  const sizes = ['large', 'small', 'mini']
  const valid = sizes.indexOf(value.toLowerCase()) !== -1 || value === ''
  if (!valid) {
    throw new Error(`Size is must be one of ['large', 'small', 'mini']`)
  } else {
    return valid
  }
}
