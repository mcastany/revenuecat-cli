const { withContext } = require('../../utils')
const builder = {
  'is_current': {
    alias: 'c',
    type: 'string',
    describe: 'Offering Lookup key',
    question: {
      type: 'string',
      name: 'is_current',
      message: 'Offering Lookup key?'
    }
  },
  'offering_id': {
    alias: 'oid',
    type: 'string',
    describe: 'Offering ID',
    question: {
      type: 'list',
      name: 'offering_id',
      message: 'What\'s the RC Offerings?',
      getChoices: async (sdk, projectId ) => {
        const { data} = await sdk.listOfferings({limit: '20', project_id: projectId })
        return data.items.map(o => { return { value: o.id, name: o.lookup_key } })
      }
    }
  },
  'display_name': {
    alias: 'si',
    type: 'string',
    describe: 'Offering display name',
    question: {
      type: 'string',
      name: 'display_name',
      message: 'Offering display name?'
    }
  }
}

exports.command = 'update'
exports.desc = 'Update an offering'
exports.builder = builder

exports.handler = withContext(builder, async function ({ sdk, projectId, log }, argv) {
  const payload = {
    is_current: argv.is_current,
    display_name: argv.display_name,
  }
  
  const { data } = await sdk.updateOffering(payload, {
    project_id: projectId,
    offering_id: argv.offering_id
  })

  log([data])
})