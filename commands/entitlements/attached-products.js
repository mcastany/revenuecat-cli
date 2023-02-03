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
        }})
      }
    } 
  }
}

exports.command = 'list-products'
exports.desc = ''
exports.builder = builder

exports.handler = withContext(builder, async function ({ sdk, projectId}, argv) {
  const { data: products} = await sdk.getProductsFromEntitlement({
    limit: '20', 
    project_id: projectId,
    entitlement_id: argv.entitlement_id
  })

  console.table(products.items)
})