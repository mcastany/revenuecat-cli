const fs = require('fs')
const path = require('path')
const os = require('os')

class RC {
  constructor() {
    throw new Error('Use Singleton.getInstance()')
  }

  static getInstance(profile = 'default') {
    if (!RC.instance || !RC.instance[profile]) {
      RC.instance = RC.instance || {}
      const sdk = require('api')('@rcv2/v2.0#wt5e3a5lddfetqe')
      
      // load profile and key
      const file = path.join(os.homedir(), '.rc-admin')
      const fileContent = fs.readFileSync(file)
    
      let jsonData = []
      try{
        jsonData = JSON.parse(fileContent)
      } catch(e){
        console.debug('error:', e)
      }


      let existingProfile = jsonData.filter(p => p.profile === profile)[0]
      

      if (!existingProfile && profile === 'default' && jsonData.length > 0){
        existingProfile = jsonData[0]
      }
      
      if (!existingProfile){
        return false
      }

      sdk.auth(existingProfile['api-key'])
      RC.instance[profile] = { sdk, projectId: existingProfile['project-id'] }
    }

    return RC.instance[profile]
  }
}
module.exports = RC