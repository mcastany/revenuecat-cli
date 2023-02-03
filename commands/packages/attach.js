const { withContext } = require('../../utils')
const builder = {
  'package_id': {
    alias: 'eid',
    type: 'string',
    describe: 'Package identifier',
    question: {
      type: 'string',
      name: 'package_id',
      message: 'What\'s the Package ID?'
      // TODO Figure out how to give options. Probably ask offerings and then list package
    } 
  },
  'product_ids': {
    alias: 'eid',
    type: 'string',
    describe: 'Product identifiers',
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
  await sdk.attachProductsToPackage({
    product_ids: argv.product_ids
  },{
    project_id: projectId,
    package_id: argv.package_id
  })

  console.table(`successfully attached ${argv.product_ids.length} products`)
})