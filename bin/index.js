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

  
  const parsedArgs = Yargs
    .help(false)
    .parse()

  if (parsedArgs.help){
    console.log(data)
    console.log(`%c
                    /\\_/\\  (
                  ( ^.^ ) _)
                    \\"/  (
                  ( | | )
                  (__d b__)
    `,  'font-family: monospace')
  }

  Yargs
    .scriptName('revenuecat')
    .usage('$0 <entity> <command> [args]')
    .option('p', require('../options/global_profile'))
    .option('table', require('../options/table'))
    .option('dates', require('../options/dates'))
    .command('configure', 'Configure API keys', (yargs) => {
      return yargs.commandDir('../commands/configure')
    })
    .command('dashboard', 'Open dashboard', (yargs) => {
      return yargs.commandDir('../commands/dashboard')
    })
    .command('metrics', 'Show metrics', (yargs) => {
      return yargs.commandDir('../commands/metrics')
    })
    .command('customers', 'Manage customers', (yargs) => {
      return yargs.commandDir('../commands/customers')
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
    .command('subscriptions', 'Manage subscriptions', (yargs) => {
      return yargs.commandDir('../commands/subscriptions')
    })
    .command('packages', 'Manage packages', (yargs) => {
      return yargs.commandDir('../commands/packages')
    })
    .command({
      command: '*',
      handler() {
        // Something for getting started
        // check if there is a configuration, if not, just tell them to configure the SDK
        console.log(data)
        console.log(`%c
                        /\\_/\\  (
                      ( ^.^ ) _)
                        \\"/  (
                      ( | | )
                      (__d b__)
        `,  'font-family: monospace')

        Yargs.showHelp()
      }
    })
    .demandCommand()
    .strictCommands()
    .help(true)
    .epilogue('for more information, go to http://revenuecat.com')
    .argv
})

