const { getSettingsContent } = require('./utils')
// const sdk = require('api')('@rcv2/v2.0#wt5e3a5lddfetqe')
const sdk = require('api')('@rcdev/v1.0#hf33ldocnids')


class RC {
  constructor() {
    throw new Error('Use Singleton.getInstance()')
  }

  static async getInstance(profile) {
    if (!profile){
      if (!RC.default){
        const settings = await getSettingsContent()
        const defaultProfile = settings.filter(d => d.default)[0]

        if (!defaultProfile){
          console.log('You can only have one default profile. Execute command revenuecat configure set-default')
          return false
        }

        sdk.auth(defaultProfile['api-key'])
        if (defaultProfile.hostname){
          sdk.server(defaultProfile.hostname, { foo: 'var'})
        }
        RC.default = { sdk, projectId: defaultProfile['project-id'] }
      }

      return RC.default
    }

    if (!RC.instance || !RC.instance[profile]) {
      RC.instance = RC.instance || {}
      // load profile and key
      const settings = await getSettingsContent()

      let existingProfile = settings.filter(p => p.profile === profile)[0]
      
      if (!existingProfile){
        return false
      }

      if (existingProfile.hostname){
        sdk.server(existingProfile.hostname)
      }

      sdk.auth(existingProfile['api-key'])
      RC.instance[profile] = { sdk, projectId: existingProfile['project-id'] }
    }

    return RC.instance[profile]
  }
}
module.exports = RC