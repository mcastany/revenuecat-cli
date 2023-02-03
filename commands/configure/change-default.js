const { getSettingsContent, storeSettingsContent } = require('../../utils')
const inquirer = require('inquirer')
const builder = {
  profile: {
    alias: 'p',
    type: 'string',
    describe: 'Profile',
    question: {
      type: 'list',
      name: 'profile',
      message: 'What profile do you want to use as default?'
    } 
  }
}

exports.command = 'default'
exports.desc = ''
exports.builder = builder

exports.handler = async function (argv) {
  let settings = await getSettingsContent()
  
  const options = { 
    choices: settings.filter(d => !!d.profile).map(d => d.profile)
  }

  if (options.choices.length === 0){
    console.log('No profile found. Run revenuecat configure login first')
    return
  }

  if (!argv.profile){
    const question = Object.assign(options, builder.profile.question)
    console.log(question)
    const answers = await inquirer.prompt(question)

    argv.profile = answers.profile
  }

  let wasSet = false

  settings.forEach(d => {
    const defaultValue = d.profile === argv.profile

    if (defaultValue){
      wasSet = true
    }

    d.default = defaultValue
  })

  if (!wasSet){
    console.log('Profile not found')
    return
  }

  return await storeSettingsContent(settings)
}

