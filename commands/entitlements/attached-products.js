const { withContext } = require('../../utils')
const builder = {
  'entitlement_id': require('../../options/entitlement_id'),
}

exports.command = 'list-products'
exports.desc = ''
exports.builder = builder

exports.handler = withContext(builder, async function ({ sdk, projectId, log }, argv) {
  const { data: products} = await sdk.getProductsFromEntitlement({
    limit: '20', 
    project_id: projectId,
    entitlement_id: argv.entitlement_id
  })

  log(products.items)
})