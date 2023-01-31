const sharedOptions = require('../../options')
const os = require('os')
const path = require('path')
const fs = require('fs').promises
const { pick } = require('../../utils')
const inquirer = require('inquirer')
const builder = {
  'api-key': sharedOptions['api-key'],
  'project-id': sharedOptions['project-id'],
  'profile': sharedOptions['profile'],
}

exports.command = 'login'
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

  if(missing.length === 0){
    setCredentials(input)
    return
  }

  const answers = await inquirer.prompt(missing)
  await setCredentials({...input, ...answers})
}

async function setCredentials(data){
  const file = path.join(os.homedir(), '.rc-admin')
 
  return fs.readFile(file)
    .then(fileContent => {
      let jsonData = []
      try{
        jsonData = JSON.parse(fileContent)
      } catch(e){
        console.debug('error:', e)
      }

      const existingKey = jsonData.filter(j => j['api-key'] === data['api-key'] || j['profile'] === data['profile'])
      if (existingKey.length > 0){
        console.error('key already exists')
        return
      }
        
      jsonData.push(data)
      
      return fs.
        writeFile(
          file,
          JSON.stringify(jsonData, null, 4),
          { flag: 'w'}
        )
    })
    .catch(e => {
      if (e.code === 'ENOENT'){
        console.debug('writing', data)
        // ignore error
        return fs.
          writeFile(
            file,
            JSON.stringify(data, null, 4), 
            { flag: 'w'}
          )
      }

      console.warn('error reading file', e)
      throw e
    })
}