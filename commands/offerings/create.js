const { withContext } = require('../../utils')
const builder = {
  'lookup_key': {
    alias: 'key',
    type: 'string',
    describe: 'Offering Lookup key',
    question: {
      type: 'string',
      name: 'lookup_key',
      message: 'Offering Lookup key?'
    }
  },
  'display_name': {
    alias: 'si',
    type: 'string',
    describe: 'Offering display name',
    question: {
      type: 'string',
      name: 'display_name',
      message: 'Offering display name?'
    }
  }
}

exports.command = 'create [args]'
exports.desc = 'Create an offering'
exports.builder = builder

exports.handler = withContext(builder, async function ({ sdk, projectId, log }, argv) {
  const payload = {
    lookup_key: argv.lookup_key,
    display_name: argv.display_name,
  }
  
  const { data } = await sdk.createOffering(payload, {
    project_id: projectId
  })

  log([data])
})