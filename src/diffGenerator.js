import fs from 'fs';
import readline from 'readline'
import _ from 'lodash';

const filePath1 = 'path/to/file1.json';
const filePath2 = 'path/to/file2.json';


function genDiff(filepath1, filepath2) {
  const obj1 = JSON.parse(fs.readFileSync(filepath1));
  const obj2 = JSON.parse(fs.readFileSync(filepath2));

  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();

  const diff = keys.reduce((acc, key) => {
    if (!Object.prototype.hasOwnProperty.call(obj1, key)) {
      return `${acc} + ${key}: ${obj2[key]}\n`;
    }
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
      return `${acc} - ${key}: ${obj1[key]}\n`;
    }
    if (obj1[key] !== obj2[key]) {
      return `${acc} - ${key}: ${obj1[key]}\n + ${key}: ${obj2[key]}\n`;
    }
    return `${acc} ${key}: ${obj1[key]}\n`;
  }, '{\n');

  return `${diff}}`;
}

export { genDiff };