#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import formatDiff from '../src/index.js';

const program = new Command();
program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format(choices: stylish, plain, json)', 'stylish')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .action((pathFile1, pathFile2) => console.log(formatDiff(pathFile1, pathFile2, program.opts().format)));
program.parser();
