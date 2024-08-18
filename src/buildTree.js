/*
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

export { genDiff };*/

import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2)); // обьединение ключей в один массив

  return keys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {  // Если значения по этому ключу в обоих объектах являются объектами, то рекурсивно вызывается buildTree для этих вложенных объектов
      return { key, type: 'nested', value: buildTree(data1[key], data2[key]) };  //  и результат помещается в объект с ключом value.
    }
    if (!Object.hasOwn(data2, key)) {  // Если ключ есть только в data1
      return { key, type: 'deleted', value: data1[key] };  // то создается объект с типом 'deleted' и значением из data1
    }
    if (!Object.hasOwn(data1, key)) {  // Если ключ есть только в data2
      return { key, type: 'added', value: data2[key] };  // то создается объект с типом 'added' и значением из data2
    }
    if (data1[key] !== data2[key]) {  // Если значения по ключу различаются в data1 и data2
      return {
        key, type: 'changed', value1: data1[key], value2: data2[key], // то создается объект с типом 'changed' и значениями из обоих объектов
      };
    }
    return { key, type: 'unchanged', value: data1[key] };
  });
};

export default buildTree; // Все созданные объекты помещаются в массив, который и возвращается в качестве результата функции buildTree.