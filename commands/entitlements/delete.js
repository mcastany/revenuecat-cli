const { withContext} = require('../../utils')
const builder = {
  'entitlement_id': {
    alias: 'eid',
    type: 'string',
    describe: 'Entitlement identifier',
    question: {
      type: 'list',
      name: 'entitlement_id',
      message: 'What\'s the RC Entitlement identifier?',
      getChoices: async (sdk, projectId ) => {
        const entitlements = await sdk.listEntitlements({limit: '20', project_id: projectId })
        return entitlements.data.items.map(o => { return { value: o.id, name: o.lookup_key } })
      }
    } 
  }
}

exports.command = 'delete [args]'
exports.desc = 'Delete an entitlement'
exports.builder = builder

exports.handler = withContext(builder, async function({ sdk, projectId, log }, argv) {
  await sdk.deleteProduct({product_id: argv.entitlement_id, project_id: projectId})
  log('Entitlement successfully deleted')
})