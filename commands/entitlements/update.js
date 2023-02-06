const { withContext } = require('../../utils')
const builder = {
  'entitlement_id': require('../../options/entitlement_id'),
  'display_name': require('./options/display_name')
}

exports.command = 'update'
exports.desc = 'Update an entitlement'
exports.builder = builder

exports.handler = withContext(builder, async function ({ sdk, projectId, log }, argv) {
  const payload = {
    display_name: argv.display_name,
  }
  
  const { data } = await sdk.updateEntitlement(payload, {
    project_id: projectId,
    offering_id: argv.offering_id
  })

  log([data])
})