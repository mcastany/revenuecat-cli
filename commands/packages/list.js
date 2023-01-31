const { withContext } = require('../../utils')

const inquirer = require('inquirer')
const builder = {
  'offering-id': {
    alias: 'oid',
    type: 'string',
    describe: 'RevenueCat Offering ID',
    question: {
      type: 'list',
      name: 'offering-id',
      message: 'Offering ID',
      choices: () => {

      }
    } 
  }
}

exports.command = 'list'
exports.desc = ''
exports.builder = builder

exports.handler = withContext(async function ({ sdk, projectId}, argv) {
  let offeringId = argv['offering-id']

  if (!offeringId){
    const getOfferings = await sdk.listOfferings({limit: '20', project_id: projectId })
    const questions = Object.assign({}, { 
      choices: getOfferings.data.items.map(o => { return { value: o.id, name: o.lookup_key } })
    }, builder['offering-id'].question)
    const answer = await inquirer.prompt(questions)
    offeringId = answer['offering-id']
  }

  const products = await sdk.listPackages({limit: '20', project_id: projectId, offering_id: offeringId})
  console.table(products.data.items)
})