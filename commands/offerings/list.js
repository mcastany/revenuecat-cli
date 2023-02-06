const { withContext } = require('../../utils')

exports.command = 'list'
exports.desc = ''
exports.builder = {}

exports.handler = withContext({}, async function ({ sdk, projectId}) {
  const { data } = await sdk.listOfferings({limit: '20', project_id: projectId})
  console.table(data.items)
})