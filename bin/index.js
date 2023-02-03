#! /usr/bin/env node
const Yargs = require('yargs')
const figlet = require('figlet')

figlet('RevenueCat', {
  font: 'slant',
  // horizontalLayout: 'full'
}, function(err, data) {
  if (err) {
    console.log('Something went wrong...')
    console.dir(err)
    return
  }

  console.log(data)
  console.log(`%c
                 /\\_/\\  (
                ( ^.^ ) _)
                  \\"/  (
                ( | | )
                (__d b__)
  `,  'font-family: monospace')

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
    .command({
      command: '*',
      handler() {
        // Something for getting started
        // check if there is a configuration, if not, just tell them to configure the SDK
        Yargs.showHelp()
      }
    })
    .demandCommand()
    .strictCommands()
    .help(true)
    .argv
})

