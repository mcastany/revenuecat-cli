const { withContext} = require('../../utils')
const builder = {
  'package_id': {
    alias: 'id',
    type: 'string',
    describe: 'Package identifier',
    question: {
      type: 'list',
      name: 'package_id',
      message: 'What\'s the RC package?',
      getChoices: async (sdk, projectId ) => {
        const { data} = await sdk.listPackages({limit: '20', project_id: projectId })
        return data.items.map(o => { return { value: o.id, name: o.lookup_key } })
      }
    } 
  }
}

exports.command = 'delete'
exports.desc = 'Delete an package with its attached package'
exports.builder = builder

exports.handler = withContext(builder, async function({ sdk, projectId, log }, argv) {
  await sdk.deletePackageFromOffering({product_id: argv.package_id, project_id: projectId})
  log('Package successfully deleted')
})