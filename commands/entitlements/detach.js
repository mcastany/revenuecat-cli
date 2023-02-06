const { withContext } = require('../../utils')
const builder = {
  'entitlement_id': require('../../options/entitlement_id'),
  'product_ids': require('../../options/product_ids')
}
exports.command = 'detach'
exports.desc = ''
exports.builder = builder

exports.handler = withContext(builder, async function ({ sdk, projectId, log }, argv) {
  if (argv.product_ids.length === 0){
    log('select at least one product to detach to the entitlement')
    return
  }

  await sdk.detachProductsFromEntitlement({
    product_ids: argv.product_ids,
    entitlement_id: argv.entitlement_id
  },{
    project_id: projectId
  })

  log(`successfully detached ${argv.product_ids.length} products`)
})