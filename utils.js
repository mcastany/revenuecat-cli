const api = require('./rc')

module.exports.pick = function pick(obj, ...props) {
  return props.reduce(function(result, prop) {
    result[prop] = obj[prop]
    return result
  }, {})
}


module.exports.withContext = function(fn) {
  return async (argv) => {
    const instance = api.getInstance(argv.profile)

    if (!instance){
      console.log('Profile not found, make sure you run the configure command')
      return
    }

    return await fn({ 
      sdk: instance.sdk,
      profile: instance.profile,
      projectId: instance.projectId
    }, argv)
  }
}