const { withContext } = require('../../utils')

exports.command = 'get [id]'
exports.desc = 'Get a single entitlement'
exports.builder = {}

exports.handler = withContext(['id'], {}, async function({ sdk, projectId, log }, argv) {
  const products = await sdk.getEntitlement({entitlement_id: argv.id, project_id: projectId})
  log([products.data])
})