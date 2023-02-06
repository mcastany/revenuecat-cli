const { withContext} = require('../../utils')
const builder = {
  'entitlement_id': require('../../options/entitlement_id'),
}

exports.command = 'delete'
exports.desc = 'Delete an entitlement'
exports.builder = builder

exports.handler = withContext(builder, async function({ sdk, projectId, log }, argv) {
  await sdk.deleteEntitlement({entitlement_id: argv.entitlement_id, project_id: projectId})
  log('Entitlement successfully deleted')
})