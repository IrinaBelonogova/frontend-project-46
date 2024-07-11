const fs = require('fs');
const { genDiff } = require('./src/diffGenerator.js');

test(() => {
  const filepath1 = fs.readFileSync('filepath1.json');
  const filepath2 = fs.readFileSync('filepath2.json');

  expect(genDiff(filepath1, filepath2)).toEqual({
    added: ['verbose'],
    removed: ['proxy', 'follow'],
    updated: [['timeout', 50, 20]]
  });
});
