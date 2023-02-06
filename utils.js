const os = require('os')
const fs = require('fs')
const path = require('path')
const fsPromise = fs.promises
const _ = require('lodash')
const inquirer = require('inquirer')

function pick(obj, ...props) {
  return props.reduce(function(result, prop) {
    result[prop] = obj[prop]
    return result
  }, {})
}

function withContext(builder, fn) {
  return async (argv) => {
    const api = require('./rc')
    const instance = await api.getInstance(argv.profile)

    if (!instance){
      console.log('Profile not found, make sure you run the configure command')
      return
    }

    let answers = {}
    const missing = []

    if(typeof builder === 'function'){
      fn = builder
      builder = {}
    }

    const properties = Object.keys(builder)
    
    const input = pick(argv, ...properties)
    
    for (var key in input){
      if (!argv[key] && builder[key].question) {
        missing.push(builder[key].question)
      }
    }

    if (missing.length > 0){
      const questions = await Promise.all(missing.map(async q => {
        if (q.type !=='list' && q.type !== 'checkbox'){
          return q
        }

        if (!q.getChoices){
          return q
        }

        return {
          choices: await q.getChoices(instance.sdk, instance.projectId),
          ..._.omit(q, 'getChoices')
        }
      }))
      
      answers = await inquirer.prompt(questions)  

      console.log('answers', answers)
    }

    _.merge(argv, answers)
    try{
      await fn({ 
        sdk: instance.sdk,
        profile: instance.profile,
        projectId: instance.projectId
      }, argv)
    } catch(e){
      console.log(e.data || e.message || e)
    }
  }
}

async function getSettingsContent(){
  const file = path.join(os.homedir(), '.rc-admin')

  if (!fs.existsSync(file)){
    fsPromise.writeFile(file, '[]', { flag: 'w'})
  }

  const fileContent = await fsPromise.readFile(file)
  let jsonData = []
  try{
    jsonData = JSON.parse(fileContent)
  } catch(e){
    // console.debug('error:', e)
  }

  return jsonData
}

async function storeSettingsContent(content){
  const file = path.join(os.homedir(), '.rc-admin')

  fsPromise.writeFile(file, JSON.stringify(content, null, 4), { flag: 'w'})
}

module.exports.getSettingsContent = getSettingsContent

module.exports.storeSettingsContent = storeSettingsContent

module.exports.pick = pick

module.exports.withContext = withContext