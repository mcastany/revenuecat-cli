const { withContext } = require('../../utils')
const inquirer = require('inquirer')
const builder = {
  'product_id': {
    alias: 'pid',
    type: 'string',
    describe: 'Product identifier',
    question: {
      type: 'list',
      name: 'product_id',
      message: 'What\'s the RC Product identifier?'
    } 
  }
}

exports.command = 'delete [args]'
exports.desc = 'Delete a product'
exports.builder = builder

exports.handler = withContext(async function({ sdk, projectId }, argv) {
  let answers = {}
  if(!argv.product_id){
    const getOfferings = await sdk.listProducts({limit: '20', project_id: projectId })
    const questions = Object.assign({}, { 
      choices: getOfferings.data.items.map(o => { return { value: o.id, name: o.store_identifier } })
    }, builder['product_id'].question)

    answers = await inquirer.prompt(questions)
  }


  await sdk.deleteProduct({product_id: answers.product_id || argv.product_id, project_id: projectId})
  console.log('Product successfully deleted')
})