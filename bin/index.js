#! /usr/bin/env node
const Yargs = require('yargs')
const figlet = require('figlet')

figlet('RevenueCat CLI', {
  font: 'slant',
  // horizontalLayout: 'full'
}, function(err, data) {
  if (err) {
    console.log('Something went wrong...')
    console.dir(err)
    return
  }
  console.log(data)

  Yargs
    .scriptName('revenuecat')
    .usage('$0 <entity> <command> [args]')
    .option('p', {
      alias: 'profile',
      global: true,
      description: 'When multiple accounts configured, define which one to use'
    })
    .command('configure', 'Configure API keys', (yargs) => {
      return yargs.commandDir('../commands/configure')
    })
    .command('products', 'Manage products', (yargs) => {
      return yargs.commandDir('../commands/products')
    })
    .command('entitlements', 'Manage entitlements', (yargs) => {
      return yargs.commandDir('../commands/entitlements')
    })
    .command('offerings', 'Manage offerings', (yargs) => {
      return yargs.commandDir('../commands/offerings')
    })
    .command('packages', 'Manage packages', (yargs) => {
      return yargs.commandDir('../commands/packages')
    })
    .help(true)
    .command({
      command: '*',
      handler() {
        Yargs.showHelp()
      }
    })
    .demandCommand()
    .argv
})

