const { pick, getSettingsContent, storeSettingsContent } = require('../../utils')
const inquirer = require('inquirer')
const builder = {
  'api-key': require('./options/api_key'),
  'profile': require('../../options/profile'),
  'project-id': require('./options/project_id'),
  'server': require('./options/server'),
  'default': require('./options/default')
}

exports.command = 'add-key'
exports.desc = ''
exports.builder = builder

exports.handler = async function (argv) {
  const missing = []

  const input = pick(argv, ...Object.keys(builder))
  
  for (var key in input){
    if (!argv[key]) {
      missing.push(builder[key].question)
    }
  }

  let answers = []

  if(missing.length > 0){
    answers = await inquirer.prompt(missing)
  }

  let settings = await getSettingsContent()
  const data = {...input, ...answers}

  const existingKey = settings.filter(j => j['api-key'] === data['api-key'] || j['profile'] === data['profile'])
  if (existingKey.length > 0){
    console.error('key or profile already exists')
    return
  }

  if (data.default){
    settings.forEach(s => s.default = false)
  }

  settings.push(data)

  await storeSettingsContent(settings)
  console.log('configuration updated')
}
