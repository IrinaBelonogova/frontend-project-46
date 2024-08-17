import fs from 'fs';
import { buildTree } from './src/buildTree.js';

test(() => {
  const data1 = fs.readFileSync('filepath1.json');
  const data2 = fs.readFileSync('filepath2.json');

  expect(buildTree(data1, data2)).toEqual({
    added: ['verbose'],
    removed: ['proxy', 'follow'],
    updated: [['timeout', 50, 20]]
  });
});
