const { withContext } = require('../../utils')
const builder = {
  'offering_id': require('../../options/offering_id'),
  'display_name': require('./options/display_name'),
  'is_current': {
    alias: 'c',
    type: 'string',
    describe: 'Offering Lookup key',
    question: {
      type: 'string',
      name: 'is_current',
      message: 'Offering Lookup key?'
    }
  }
}

exports.command = 'update'
exports.desc = 'Update an offering'
exports.builder = builder

exports.handler = withContext(builder, async function ({ sdk, projectId, log }, argv) {
  const payload = {
    is_current: argv.is_current,
    display_name: argv.display_name,
  }
  
  const { data } = await sdk.updateOffering(payload, {
    project_id: projectId,
    offering_id: argv.offering_id
  })

  log([data])
})