module.exports = {
  type: 'boolean',
  describe: 'Set profile as default',
  question: {
    type: 'confirm',
    name: 'default',
    default: true,
    message: 'Do you want to set this as the default profile?'
  } 
}