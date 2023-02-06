const { withContext } = require('../../utils')

const builder = {
  'package_id': require('./options/package_id'),
  'product_ids': require('../../options/product_ids')
}

exports.command = 'attach'
exports.desc = ''
exports.builder = builder

exports.handler = withContext(builder, async function ({ sdk, projectId, log}, argv) {
  await sdk.attachProductsToPackage({
    product_ids: argv.product_ids
  },{
    project_id: projectId,
    package_id: argv.package_id
  })

  log(`successfully attached ${argv.product_ids.length} products`)
})