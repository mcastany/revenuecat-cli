const { withContext } = require('../../utils')
const builder = {
  // TODO this should be positional not an option
  'package_id': {
    alias: 'pid',
    type: 'string',
    describe: 'Package identifier',
    question: {
      type: 'string',
      name: 'package_id',
      message: 'What\'s the RC Package Identifier?'
    } 
  }
}

exports.command = 'get [args]'
exports.desc = 'Get a single package'
exports.builder = builder

exports.handler = withContext(builder, async function({ sdk, projectId}, argv) {
  const package = await sdk.getPackage({package_id: argv.package_id, project_id: projectId})
  console.table([package.data])
})