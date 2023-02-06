const { withContext } = require('../../utils')
const builder = {
  'package_id': {
    alias: 'eid',
    type: 'string',
    describe: 'Package identifier',
    question: {
      type: 'list',
      name: 'package_id',
      message: 'What\'s the Package ID?'
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
exports.command = 'detach'
exports.desc = ''
exports.builder = builder

exports.handler = withContext(builder, async function ({ sdk, projectId, log }, argv) {
  await sdk.detachProductsFromPackage({
    product_ids: argv.product_ids
  },{
    project_id: projectId,
    package_id: argv.package_id
  })

  log(`successfully detached ${argv.product_ids.length} products`)
})