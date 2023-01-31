module.exports = {
  'api-key': {
    alias: 'k',
    type: 'string',
    describe: 'RevenueCat API Key',
    question: {
      type: 'input',
      name: 'api-key',
      message: 'What\'s your RevenueCat API key?'
    } 
  },
  'project-id': {
    alias: 'pid',
    type: 'string',
    describe: 'Project ID',
    question: {
      type: 'input',
      name: 'project-id',
      message: 'What\'s your RevenueCat Project ID?'
    } 
  },
  profile: {
    alias: 'p',
    type: 'string',
    describe: 'Profile',
    question: {
      type: 'input',
      name: 'profile',
      message: 'Define a Friendly Name for your key'
    } 
  }
}