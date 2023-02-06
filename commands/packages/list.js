const { withContext } = require('../../utils')

const builder = {
  'offering_id': {
    alias: 'oid',
    type: 'string',
    describe: 'RevenueCat Offering ID',
    question: {
      type: 'list',
      name: 'offering_id',
      message: 'Offering ID',
      getChoices: async (sdk, projectId ) => {
        const { data} = await sdk.listOfferings({limit: '20', project_id: projectId })
        return data.items.map(o => { return { value: o.id, name: o.lookup_key } })
      }
    } 
  }
}

exports.command = 'list'
exports.desc = ''
exports.builder = builder

exports.handler = withContext(builder, async function ({ sdk, projectId, log }, argv) {
  const products = await sdk.listPackages({limit: '20', project_id: projectId, offering_id: argv.offering_id})
  log(products.data.items)
})