import fs from 'fs';
import _ from 'readline'
import _ from 'lodash';
import _ from '../index.js';

function genDiff(filepath1, filepath2) {
  const obj1 = JSON.parse(fs.readFileSync(filepath1), 'utf-8');
  const obj2 = JSON.parse(fs.readFileSync(filepath2), 'utf-8');

  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  let diffText = '{\n';
  
  for ( key of keys) {
    if (!Object.prototype.hasOwnProperty.call(obj1, key)) {
      diffText += ` + ${key}: ${obj2[key]}\n`;
    } else if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
      diffText += ` - ${key}: ${obj1[key]}\n`;
    } else if (obj1[key] !== obj2[key]) {
      diffText += ` - ${key}: ${obj1[key]}\n + ${key}: ${obj2[key]}\n`;
    } else {
      diffText += ` ${key}: ${obj1[key]}\n`;
    }
  }
  return `${diffText}}`;
}

export { genDiff };