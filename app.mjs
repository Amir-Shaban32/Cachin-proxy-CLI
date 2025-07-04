import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { start, clearCache, listCache } from './proxy.mjs';

yargs(hideBin(process.argv))
  .scriptName('proxy-cli')
  .command('start [port] [origin]',
    'Start the caching proxy server',
    (yargs) => {
      return yargs
        .positional('port', {
          description: 'Port number',
          type: 'number',
          default: 3000
        })
        .positional('origin', {
          description: 'Origin URL',
          type: 'string',
          default: 'https://dummyjson.com'
        });
    },
    (argv) => {
      const { port, origin } = argv;
      start(port, origin);
    }
  )
  .command('clear-cache',
    'Clear all cached responses',
    () => {},
    () => {
      clearCache();
    }
  )
  .command('list-cache',
    'List all cached URLs',
    () => {},
    () => {
      listCache();
    }
  )
  .demandCommand()
  .help()
  .argv;
