const { withContext } = require('../../utils')
const builder = {
  'entitlement_id': require('../../options/entitlement_id'),
  'product_ids': require('../../options/product_ids')
}
exports.command = 'attach'
exports.desc = ''
exports.builder = builder

exports.handler = withContext(builder, async function ({ sdk, projectId, log }, argv) {
  if (argv.product_ids.length === 0){
    log('select at least one product to attach to the entitlement')
    return
  }

  await sdk.attachProductsToEntitlement({
    product_ids: argv.product_ids,
    entitlement_id: argv.entitlement_id
  },{
    project_id: projectId
  })

  log(`successfully attached ${argv.product_ids.length} products`)
})