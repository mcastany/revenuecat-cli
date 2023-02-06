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
    describe: 'Attributes in the format \'<name>=<value>\'',
    question: {
      type: 'expand',
      name: 'attributes',
      message: 'Attributes?'
    } 
  }
}
exports.command = 'create'
exports.desc = 'Create a customer'
exports.builder = builder

exports.handler = withContext(builder, async function ({ sdk, projectId, log}, argv) {
  const { data } = await sdk.createCustomer({
    id: argv.id, 
    attributes: [{name: 'asd', value: 'asd'}]    
  }, {
    project_id: projectId 
  })

  log([data])    
})