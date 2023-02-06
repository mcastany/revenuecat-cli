const { withContext } = require('../../utils')
const builder = {
  'package_id': require('./options/package_id'),
}

exports.command = 'list-products'
exports.desc = ''
exports.builder = builder

exports.handler = withContext(builder, async function ({ sdk, projectId, log}, argv) {
  const { data } = await sdk.getProductsFromPackage({
    limit: '20', 
    project_id: projectId,
    entitlement_id: argv.package_id
  })

  log(data.items)
})