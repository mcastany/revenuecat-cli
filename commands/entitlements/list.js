const { withContext } = require('../../utils')

exports.command = 'list'
exports.desc = ''
exports.builder = {}

exports.handler = withContext(async function ({ sdk, projectId}) {
  const products = await sdk.listEntitlements({limit: '20', project_id: projectId})
  console.table(products.data.items)
})