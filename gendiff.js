#!/usr/bin/env node

import { program } from 'commander';
import path from 'path';

import { parseFile } from './src/parse.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const absolutePath1 = path.resolve(process.cwd(), filepath1);
    const absolutePath2 = path.resolve(process.cwd(), filepath2);

    const data1 = parseFile(absolutePath1);
    const data2 = parseFile(absolutePath2);

    console.log(`Comparing ${data1} and ${data2} in ${program.format} format`);
  });

program.parse();
