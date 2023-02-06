const { withContext } = require('../../utils')

exports.command = 'get-entitlements [id]'
exports.desc = 'Get a subscription\'s entitlements'
exports.builder = {}

exports.handler = withContext(['id'], {}, async function({ sdk, projectId, log}, argv) {
  const { data } = await sdk.listSubscriptionEntitlements({subscription_id: argv.id, project_id: projectId, limit: '20'})
  log(data.items)
})