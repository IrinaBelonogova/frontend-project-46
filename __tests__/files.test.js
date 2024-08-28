import fs from 'fs';
import yaml from 'js-yaml';
import { buildTree } from './src/buildTree.js';
import { compareJSON } from '../src/compareJSON.js';
import formatPlain from '../src/fopmatPlain.js';
import formatJson from '../src/formatJson.js'

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

describe('compareJSON', () => {
  test(() => {
    const file1 = {
      setting1: 'Value 1',
      setting2: 200,
    };
    const file2 = {
      setting1: 'Value 1',
      setting2: 300,
    };

    const expectedDiff = {
      'setting2': {
        status: 'changed',
        value1: 200,
        value2: 300,
      },
    };

    const result = compareJSON(file1, file2);
    expect(result).toEqual(expectedDiff);
  });

  test(() => {
    const file1 = {
      common: {
        setting1: 'Value 1',
        setting2: 'Value 2',
      },
      group: {
        setting3: 'Value 3',
      },
    };
    const file2 = {
      common: {
        setting1: 'Value 1',
        setting2: 'Changed Value',
      },
      group: {
        setting3: 'Value 4',
      },
    };

    const expectedDiff = {
      'common.setting2': {
        status: 'changed',
        value1: 'Value 2',
        value2: 'Changed Value',
      },
      'group.setting3': {
        status: 'changed',
        value1: 'Value 3',
        value2: 'Value 4',
      },
    };

    const result = compareJSON(file1, file2);
    expect(result).toEqual(expectedDiff);
  });
});

describe('formatPlain', () => {
  test(() => {
      const diff = {
          'setting1': {
              status: 'added',
              value2: 'new value',
          },
      };
      expect(formatPlain(diff)).toEqual("Property 'setting1' was added with value: \"new value\"");
  });

  test(() => {
      const diff = {
          'setting1': {
              status: 'removed',
          },
      };
      expect(formatPlain(diff)).toEqual("Property 'setting1' was removed");
  });

  test(() => {
      const diff = {
          'setting1': {
              status: 'changed',
              value1: 'old value',
              value2: 'new value',
          },
      };
      expect(formatPlain(diff)).toEqual("Property 'setting1' was updated. From \"old value\" to \"new value\"");
  });
  
  test(() => {
      const diff = {
          'common': {
              status: 'unchanged',
          },
          'common.setting1': {
              status: 'changed',
              value1: 'old value',
              value2: 'new value',
          },
          'common.setting2': {
              status: 'added',
              value2: 'added value',
          },
          'common.setting3': {
              status: 'removed',
          },
      };
      
      const result = formatPlain(diff);
      
      expect(result).toEqual([
          "Property 'common.setting1' was updated. From \"old value\" to \"new value\"",
          "Property 'common.setting2' was added with value: \"added value\"",
          "Property 'common.setting3' was removed"
      ].join('\n'));
  });
});

describe('formatJson', () => {
  it(() => {
      const inputDiff = {
          common: {
              setting1: {
                  status: 'unchanged',
                  value1: 'Value 1',
              },
              setting2: {
                  status: 'changed',
                  value1: 'Value 2',
                  value2: 'Value 3',
              },
              setting3: {
                  status: 'added',
                  value2: 'Value 4',
              },
          },
      };

      const expectedOutput = JSON.stringify(inputDiff, null, 2);
      expect(formatJson(inputDiff)).toBe(expectedOutput);
  });
});
