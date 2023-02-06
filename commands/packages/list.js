const { withContext } = require('../../utils')

const builder = {
  'offering_id': require('../../options/offering_id')
}

exports.command = 'list'
exports.desc = ''
exports.builder = builder

exports.handler = withContext(builder, async function ({ sdk, projectId, log }, argv) {
  const { data } = await sdk.listPackages({limit: '20', project_id: projectId, offering_id: argv.offering_id})
  log(data.items)
})