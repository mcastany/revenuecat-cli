const { withContext } = require('../../utils')
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

exports.command = 'get [args]'
exports.desc = 'Get a single offering'
exports.builder = builder

exports.handler = withContext(builder, async function({ sdk, projectId}, argv) {
  const offering = await sdk.getOffering({offering_id: argv.offering_id, project_id: projectId})
  console.table([offering.data])
})