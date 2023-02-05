const { withContext } = require('../../utils')
const builder = {
  'entitlement_id': {
    alias: 'eid',
    type: 'string',
    describe: 'Entitlement ID',
    question: {
      type: 'list',
      name: 'entitlement_id',
      message: 'What\'s the Entitlement ID?',
      getChoices: async (sdk, projectId ) => {
        const { data} = await sdk.listEntitlements({limit: '20', project_id: projectId })
        return data.items.map(o => { return { 
          value: o.id, 
          name: `${o.lookup_key} (${o.id})`
        }})
      }
    }
  },
  'display_name': {
    alias: 'si',
    type: 'string',
    describe: 'Entitlement display name',
    question: {
      type: 'string',
      name: 'display_name',
      message: 'Entitlement display name?'
    }
  }
}

exports.command = 'update [args]'
exports.desc = 'Update an entitlement'
exports.builder = builder

exports.handler = withContext(builder, async function ({sdk, projectId}, argv) {
  try {
    const payload = {
      display_name: argv.display_name,
    }
    
    const entitlement = await sdk.updateEntitlement(payload, {
      project_id: projectId,
      entitlement_id: argv.entitlement_id
    })

    console.table([entitlement.data])
  } catch (e) {
    console.error(e.data)
  }
})