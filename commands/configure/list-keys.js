const { getSettingsContent } = require('../../utils')

exports.command = 'list-keys'
exports.desc = ''
exports.builder = {}

exports.handler = async function () {
  let settings = await getSettingsContent()

  console.table(settings)
}