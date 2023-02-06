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
      message: 'Profile Name?',
    } 
  },
  default: {
    type: 'boolean',
    describe: 'Set profile as default',
    question: {
      type: 'confirm',
      name: 'default',
      default: true,
      message: 'Do you want to set this as the default profile?'
    } 
  },
  server: {
    alias: 's',
    type: 'string',
    describe: 'Base URL to use',
    question: {
      type: 'list',
      name: 'hostname',
      message: 'Change the base URL if you want to use something different?',
      default: 'https://api.revenuecat.com/v2',
      choices: [ 'https://api.revenuecat.com/v2', 'https://api-staging.revenuecat.com/v2', 'https://api-test.revenuecat.com/v2', 'http://localhost:8000/v2', 'http://localhost/v2' ]
    } 
  },
}