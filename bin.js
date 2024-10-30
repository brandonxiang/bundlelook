#!/usr/bin/env node

const sade = require('sade');
const { cluster, single, total } = require('./dist/index');
const package = require('./package.json');

const program = sade('bundlelook').version(package.version);

program.command('cluster [dir]', 'Get the file list in current directory')
  .option('-g, --group', 'File size statistics by group, join by comma')
  .action(cluster)

program.command('single [dir]', 'File size detail by specific file type')
  .option('-f, --filter', 'File size detail by specific file type')
  .option('-s, --sizeLimit', 'File size limit')
  .action(single)


program.command('total [dir]', 'Get the total file size in total')
  .action(total)

program
  .parse(process.argv);