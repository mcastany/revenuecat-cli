const { withContext } = require('../../utils')

exports.command = 'get [id]'
exports.desc = 'Get a subscription'
exports.builder = {}

exports.handler = withContext(['id'], {}, async function({ sdk, projectId, log}, argv) {
  const { data} = await sdk.getSubscription({subscription_id: argv.id, project_id: projectId})
  log([data])
})