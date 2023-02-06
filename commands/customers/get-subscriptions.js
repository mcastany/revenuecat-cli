const { withContext } = require('../../utils')

exports.command = 'get-subscriptions [id]'
exports.desc = 'Get a subscription (send id between \'\')'
exports.builder = {}

exports.handler = withContext(['id'], {}, async function({ sdk, projectId, log}, argv) {
  const { data } = await sdk.listSubscriptions({ customer_id: argv.id, project_id: projectId})
  log(data.items)
})