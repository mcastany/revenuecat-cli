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
        return data.items.map(o => { return { value: o.id, name: o.lookup_key } })
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
      message: 'Select the list of products to attach',
      getChoices: async (sdk, projectId ) => {
        const { data } = await sdk.listProducts({limit: '20', project_id: projectId })

        return data.items.map(o => { return { 
          value: o.id, 
          name: `${o.store_identifier} (${o.app})`
        } })
      }
    } 
  }
}
exports.command = 'attach'
exports.desc = ''
exports.builder = builder

exports.handler = withContext(builder, async function ({ sdk, projectId}, argv) {
  if (argv.product_ids.length === 0){
    console.log('select at least one product to attach to the entitlement')
    return
  }

  await sdk.attachProductsToEntitlement({
    product_ids: argv.product_ids,
    entitlement_id: argv.entitlement_id
  },{
    project_id: projectId
  })

  console.table(`successfully attached ${argv.product_ids.length} products`)
})