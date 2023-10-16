module.exports = {
  'system-number': {
    type: 'number',
    contentKey: 'death-system-number',
    attributes: {
      autofocus: true
    },
    validate: [
      'numeric',
      { type: 'exactlength', arguments: [9] }
    ],
  },
  'surname': {
    type: 'text',
    dependent: {
      field: 'system-number',
      value: ''
    },
    validate: [
      'required',
      { type: 'maximumlength', fn: (e) => e.length <= 30 }
    ]
  },
  'forenames': {
    type: 'text',
    dependent: {
      field: 'system-number',
      value: ''
    },
    validate: [
      'required',
      { type: 'maximumlength', fn: (e) => e.length <= 30 }
    ]
  },
  'dobd': {
    type: 'date',
    dependent: {
      field: 'system-number',
      value: ''
    },
    validate: [
      'required',
      'date',
      { type: 'before', arguments: 'today' }
    ]
  }
};
