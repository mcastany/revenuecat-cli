const { withContext } = require('../../utils')

exports.command = 'get [id]'
exports.desc = 'Get a customer'
exports.builder = {}

exports.handler = withContext(['id'], {}, async function({ sdk, projectId, log}, argv) {
  const products = await sdk.getCustomer({customer_id: argv.id, project_id: projectId})
  log([products.data])
})