const os = require('os')
const path = require('path')
const fs = require('fs')
const fsPromise = fs.promises

exports.command = 'clean'
exports.desc = ''
exports.builder = {}

exports.handler = async function () {
  const file = path.join(os.homedir(), '.rc-admin')

  if (fs.existsSync(file)){
    fsPromise.writeFile(file, '', { flag: 'w'})
  }
}