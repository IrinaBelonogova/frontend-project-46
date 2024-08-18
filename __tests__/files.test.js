import fs from 'fs';
import yaml from 'js-yaml';
import { buildTree } from './src/buildTree.js';

test(() => {
  // Читаем файлы
  const data1 = JSON.parse(fs.readFileSync('pathFile1.json', 'utf8'));
  const data2 = JSON.parse(fs.readFileSync('pathFile2.json', 'utf8'));

  // Сравниваем JSON файлы
  expect(buildTree(data1, data2)).toEqual({
    added: ['verbose'],
    removed: ['proxy', 'follow'],
    updated: [['timeout', 50, 20]]
  });

  // Читаем YAML файлы
  const yamlData1 = yaml.load(fs.readFileSync('pathFile1.yaml', 'utf8'));
  const yamlData2 = yaml.load(fs.readFileSync('pathFile2.yaml', 'utf8'));

  // Сравниваем YAML файлы
  expect(buildTree(yamlData1, yamlData2)).toEqual({
    added: ['verbose'],
    removed: ['proxy', 'follow'],
    updated: [['timeout', 50, 20]]
  });
});
