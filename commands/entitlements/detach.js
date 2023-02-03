const { withContext } = require('../../utils')
const builder = {
  'entitlement_id': {
    alias: 'eid',
    type: 'string',
    describe: 'Entitlement identifier',
    question: {
      type: 'list',
      name: 'entitlement_id',
      message: 'What\'s the Entitlement ID?',
      getChoices: async (sdk, projectId ) => {
        const { data} = await sdk.listEntitlements({limit: '20', project_id: projectId })
        return data.items.map(o => { return { 
          value: o.id, 
          name: `${o.lookup_key} (${o.id})`
        } })
      }
    } 
  },
  'product_ids': {
    alias: 'eid',
    type: 'array',
    describe: 'Product identifier',
    question: {
      type: 'checkbox',
      name: 'product_ids',
      message: 'Select the list of products to detach',
      getChoices: async (sdk, projectId ) => {
        // TODO this list should come from entitlement
        const { data } = await sdk.listProducts({limit: '20', project_id: projectId })

        return data.items.map(o => { return { 
          value: o.id, 
          name: `${o.store_identifier} (${o.app})`
        } })
      }
    } 
  }
}
exports.command = 'detach'
exports.desc = ''
exports.builder = builder

exports.handler = withContext(builder, async function ({ sdk, projectId}, argv) {
  
  await sdk.detachProductsToEntitlement({
    product_ids: argv.product_ids
  },{
    project_id: projectId,
    entitlement_id: argv.entitlement_id
  })

  console.table(`successfully detached ${argv.product_ids.length} products`)
})