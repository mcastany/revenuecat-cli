const { storeSettingsContent } = require('../../utils')

exports.command = 'clean-keys'
exports.desc = ''
exports.builder = {}

exports.handler = async function () {
  await storeSettingsContent([])
}