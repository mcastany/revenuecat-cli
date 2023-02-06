const { withContext } = require('../../utils')
const exec = require('child_process').exec


exports.command = 'open'
exports.desc = 'Open dashboard'
exports.builder = {}

exports.handler = withContext([], {}, async function({ projectId, log}) {
  const url = `https://app.revenuecat.com/projects/${projectId}/apps`

  log(`opening ${url}`)

  exec(`open ${url}`, (error) => { if (error !== null) { console.log('exec error: ' + error) } })
})