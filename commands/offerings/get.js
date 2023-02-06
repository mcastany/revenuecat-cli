const { withContext } = require('../../utils')

exports.command = 'get [id]'
exports.desc = 'Get a single offering'
exports.builder = {}

exports.handler = withContext(['id'], {}, async function({ sdk, projectId, log}, argv) {
  const { data } = await sdk.getOffering({offering_id: argv.id, project_id: projectId})
  log([data])
})