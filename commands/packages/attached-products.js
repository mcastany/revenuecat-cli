const { withContext } = require('../../utils')
const builder = {
  'package_id': {
    alias: 'eid',
    type: 'string',
    describe: 'Package identifier',
    question: {
      type: 'string',
      name: 'entitlement_id',
      message: 'What\'s the RC Package ID?'
    } 
  }
}

exports.command = 'list-products'
exports.desc = ''
exports.builder = builder

exports.handler = withContext(builder, async function ({ sdk, projectId, log}, argv) {
  const { data } = await sdk.getProductsFromPackage({
    limit: '20', 
    project_id: projectId,
    entitlement_id: argv.package_id
  })

  log(data.items)
})