const { withContext } = require('../../utils')
const builder = {
  'id': {
    alias: 'i',
    type: 'string',
    describe: 'Customer identifier',
    question: {
      type: 'string',
      name: 'id',
      message: 'Customer identifier?'
    } 
  },
  'attributes': {
    alias: 'a',
    type: 'array',
    describe: 'Attributes in the format \'<name>=<value>\''
  }
}
exports.command = 'create'
exports.desc = 'Create a customer'
exports.builder = builder

exports.handler = withContext(builder, async function ({ sdk, projectId, log}, argv) {
  const payload = {
    id: argv.id
  }

  if (argv.attributes.length > 0){
    payload.attributes = argv.attributes
      .filter(a => a.includes('='))
      .map(a => {
        const data = a.split('=')
        return { name: data[0], value: data[1] }
      })
  }
  
  const { data } = await sdk.createCustomer(payload, {
    project_id: projectId 
  })

  log([data])    
})