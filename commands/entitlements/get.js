const { withContext } = require('../../utils')
const builder = {
  // TODO this should be positional not an option
  'entitlement_id': {
    alias: 'eid',
    type: 'string',
    describe: 'Entitlement identifier',
    question: {
      type: 'list',
      name: 'offering_id',
      message: 'What\'s the Entitlement ID?',
      getChoices: async (sdk, projectId ) => {
        const { data} = await sdk.listEntitlements({limit: '20', project_id: projectId })
        return data.items.map(o => { return { value: o.id, name: o.lookup_key } })
      }
    } 
  }
}

exports.command = 'get [args]'
exports.desc = 'Get a single entitlement'
exports.builder = builder

exports.handler = withContext(builder, async function({ sdk, projectId}, argv) {
  const products = await sdk.getEntitlement({entitlement_id: argv.entitlement_id, project_id: projectId})
  console.table([products.data])
})