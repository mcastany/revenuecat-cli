const _ = require('lodash')
const { withContext } = require('../../utils')
const builder = {
  'offering_id': require('../../options/offering_id'),
  'lookup_key': {
    alias: 'key',
    type: 'string',
    describe: 'Lookup key',
    question: {
      type: 'string',
      name: 'lookup_key',
      message: 'Lookup key?'
    }
  },
  'display_name': require('./options/display_name'),
  'position': require('./options/position')
}

exports.command = 'create'
exports.desc = 'Create a package'
exports.builder = builder

exports.handler = withContext(builder, async function ({sdk, projectId, log}, argv) {
  const payload = _.omitBy({
    lookup_key: argv.lookup_key,
    display_name: argv.display_name,
    position: argv.position,
  }, _.isUndefined)
  
  const { data } = await sdk.createPackages(payload, {
    project_id: projectId,
    offering_id: argv.offering_id
  })

  log([data])
})