const _ = require('lodash')
const { withContext } = require('../../utils')
const builder = {
  'offering_id': {
    alias: 'oi',
    type: 'string',
    describe: 'Offering ID',
    question: {
      type: 'list',
      name: 'offering_id',
      message: 'Select an offering',
      getChoices: async (sdk, projectId) => {
        const { data } = await sdk.listOfferings({ limit: '20', project_id: projectId })
        return data.items.map(o => { return { value: o.id, name: o.lookup_key } })
      }
    }
  },
  'lookup_key': {
    alias: 'key',
    type: 'string',
    describe: 'Lookup key',
    question: {
      type: 'string',
      name: 'lookup_key',
      message: 'Lookup key?'
    }
  },
  'display_name': {
    alias: 'n',
    type: 'string',
    describe: 'Package display name',
    question: {
      type: 'string',
      name: 'display_name',
      message: 'Package display name?'
    }
  },
  'position': {
    alias: 'po',
    type: 'number',
    describe: 'Package position',
  }
}

exports.command = 'create'
exports.desc = 'Create a package'
exports.builder = builder

exports.handler = withContext(builder, async function ({sdk, projectId, log}, argv) {
  const payload = _.omitBy({
    lookup_key: argv.lookup_key,
    display_name: argv.display_name,
    position: argv.position,
  }, _.isUndefined)
  
  const { data } = await sdk.createPackages(payload, {
    project_id: projectId,
    offering_id: argv.offering_id
  })

  log([data])
})