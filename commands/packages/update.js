const { withContext } = require('../../utils')
const builder = {
  'package_id': require('./options/package_id'),
  'display_name': require('./options/display_name'),
  'position': require('./options/position')
}

exports.command = 'update'
exports.desc = 'Update an offering'
exports.builder = builder

exports.handler = withContext(builder, async function ({sdk, projectId}, argv) {
  const payload = {
    position: argv.position,
    display_name: argv.display_name,
  }
  
  const { data } = await sdk.updatePackage(payload, {
    project_id: projectId,
    package_id: argv.package_id
  })

  console.table([data])
})