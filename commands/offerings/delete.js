const { withContext} = require('../../utils')
const builder = {
  'offering_id': {
    alias: 'eid',
    type: 'string',
    describe: 'Offerings identifier',
    question: {
      type: 'list',
      name: 'offering_id',
      message: 'What\'s the RC Offerings?',
      getChoices: async (sdk, projectId ) => {
        const { data} = await sdk.listOfferings({limit: '20', project_id: projectId })
        return data.items.map(o => { return { value: o.id, name: o.lookup_key } })
      }
    } 
  }
}

exports.command = 'delete [args]'
exports.desc = 'Delete an offering with its attached package'
exports.builder = builder

exports.handler = withContext(builder, async function({ sdk, projectId }, argv) {
  await sdk.deleteOffering({product_id: argv.offering_id, project_id: projectId})
  console.log('Offering successfully deleted')
})