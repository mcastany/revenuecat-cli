const { withContext } = require('../../utils')
const builder = {
  'display_name': {
    alias: 'si',
    type: 'string',
    describe: 'Entitlement display name',
    question: {
      type: 'string',
      name: 'display_name',
      message: 'Entitlement display name?'
    } 
  },
  'lookup_key': {
    alias: 'aid',
    type: 'string',
    describe: 'Entitlement Identifier?',
    question: {
      type: 'string',
      name: 'lookup_key',
      message: 'Entitlement Identifier?'
    } 
  }
}
exports.command = 'create [args]'
exports.desc = 'Create an entitlement'
exports.builder = builder

exports.handler = withContext(builder, async function ({ sdk, projectId}, argv) {
  try{
    const entitlement = await sdk.createEntitlement({
      lookup_key: argv.lookup_key, 
      display_name: argv.display_name
    }, {
      project_id: projectId 
    })

    console.table([entitlement.data])    
  } catch(e){
    console.error(e.data)
  }
})