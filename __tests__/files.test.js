import fs from 'fs';
import { buildTree } from './src/buildTree.js';

test(() => {
  const data1 = fs.readFileSync('pathFile1.json');
  const data2 = fs.readFileSync('pathFile2.json');

  expect(buildTree(data1, data2)).toEqual({
    added: ['verbose'],
    removed: ['proxy', 'follow'],
    updated: [['timeout', 50, 20]]
  });
});
