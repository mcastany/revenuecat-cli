const { withContext } = require('../../utils')
const builder = {
  'store_identifier': {
    alias: 'si',
    type: 'string',
    describe: 'Store product identifier',
    question: {
      type: 'string',
      name: 'store_identifier',
      message: 'Store product identifier?'
    } 
  },
  'app_id': {
    alias: 'aid',
    type: 'string',
    describe: 'Application Identifier?',
    question: {
      type: 'string',
      name: 'app_id',
      message: 'Application Identifier?'
    } 
  }
}
exports.command = 'create [args]'
exports.desc = 'Create a product'
exports.builder = builder

exports.handler = withContext(builder, async function ({ sdk, projectId}, argv) {
  try{
    const product = await sdk.createProduct({
      app_id: argv.app_id, 
      store_identifier: argv.store_identifier
    }, {
      project_id: projectId 
    })

    console.table([product.data])    
  } catch(e){
    console.error(e.data)
  }
})