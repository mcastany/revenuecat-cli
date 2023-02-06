const { withContext } = require('../../utils')
const builder = {
  'package_id': require('./options/package_id'),
  'position': {
    alias: 'c',
    type: 'string',
    describe: 'Offering Lookup key',
    question: {
      type: 'string',
      name: 'is_current',
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

exports.command = 'update'
exports.desc = 'Update an offering'
exports.builder = builder

exports.handler = withContext(builder, async function ({sdk, projectId}, argv) {
  const payload = {
    position: argv.position,
    display_name: argv.display_name,
  }
  
  const { data } = await sdk.updatePackage(payload, {
    project_id: projectId,
    package_id: argv.package_id
  })

  console.table([data])
})