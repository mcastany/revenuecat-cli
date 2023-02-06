module.exports =  {
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
}