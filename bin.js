#!/usr/bin/env node

const sade = require('sade');
const { command } = require('./dist/index');
const package = require('./package.json');

sade('bundlelook [dir]', true)
  .version(package.version)
  .option('-f, --filter', 'File size detail by specific file type')
  .option('-g, --group', 'File size statistics by group, join by comma')
  .option('--total', 'Get the total file size in total')
  .action(command)
  .parse(process.argv);