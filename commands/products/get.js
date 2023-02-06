const { withContext } = require('../../utils')

exports.command = 'get [id]'
exports.desc = 'Get a single product by identifier'
exports.builder = {}

exports.handler = withContext(['id'], {}, async function({ sdk, projectId, log}, argv) {
  const products = await sdk.getProduct({product_id: argv.id, project_id: projectId})
  log([products.data])
})