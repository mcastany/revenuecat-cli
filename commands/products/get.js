const { withContext } = require('../../utils')
const builder = {
  'product_id': {
    alias: 'pid',
    type: 'string',
    describe: 'Product identifier',
    question: {
      type: 'string',
      name: 'product_id',
      message: 'What\'s the RC Product identifier?'
    } 
  }
}

exports.command = 'get [args]'
exports.desc = 'Get a single product by identifier'
exports.builder = builder

exports.handler = withContext(builder, async function({ sdk, projectId}, argv) {
  try{
    const products = await sdk.getProduct({product_id: argv.product_id, project_id: projectId})
    console.table([products.data])
  } catch(e){
    console.log(e.data)
  }
})