const os = require('os')
const path = require('path')
const fs = require('fs').promises

exports.command = 'list'
exports.desc = ''
exports.builder = {}

exports.handler = async function () {
  const file = path.join(os.homedir(), '.rc-admin')
  const fileContent = await fs.readFile(file)
    
  let jsonData = {}
  try{
    jsonData = JSON.parse(fileContent)
  } catch(e){
    console.debug('error:', e)
  }

  console.table(jsonData)
}