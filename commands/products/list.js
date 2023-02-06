const { withContext } = require('../../utils')

exports.command = 'list'
exports.desc = 'Get a list of products'
exports.builder = {}

exports.handler = withContext({}, async function({ sdk, projectId, log}) {
  const products = await sdk.listProducts({limit: '20', project_id: projectId})
  log(products.data.items)
})