const { withContext } = require('../../utils')
const builder = {
  'product_id': {
    alias: 'pid',
    type: 'string',
    describe: 'Product identifier',
    question: {
      type: 'list',
      name: 'product_id',
      message: 'What\'s the RC Product?',
      getChoices: async (sdk, projectId ) => {
        const getOfferings = await sdk.listProducts({limit: '20', project_id: projectId })
        return getOfferings.data.items.map(o => { return { value: o.id, name: o.store_identifier } })
      }
    } 
  }
}

exports.command = 'delete'
exports.desc = 'Delete a product'
exports.builder = builder

exports.handler = withContext(builder, async function({ sdk, projectId, log }, argv) {
  await sdk.deleteProduct({product_id: argv.product_id, project_id: projectId})
  log('Product successfully deleted')
})