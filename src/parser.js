/*import fs from 'fs';
import readline from 'readline'

const parseFile = (filePath) => {
  try {
    const content = fs.readFileSync(filePath);
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading file:', err);
    return null;
  }
};
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the file path: ', (filePath) => {
  const data = parseFile(filePath);
  if (data) {
    console.log(data);
  }
  rl.close();
});

export { parseFile };*/

import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

export default (data, typeFile) => parsers[typeFile](data);
