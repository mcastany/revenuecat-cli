const { withContext} = require('../../utils')
const builder = {
  'offering_id': require('../../options/offering_id'),
}

exports.command = 'delete'
exports.desc = 'Delete an offering with its attached package'
exports.builder = builder

exports.handler = withContext(builder, async function({ sdk, projectId, log }, argv) {
  await sdk.deleteOffering({product_id: argv.offering_id, project_id: projectId})
  log('Offering successfully deleted')
})