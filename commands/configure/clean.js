const { storeSettingsContent } = require('../../utils')

exports.command = 'clean'
exports.desc = ''
exports.builder = {}

exports.handler = async function () {
  await storeSettingsContent([])
}