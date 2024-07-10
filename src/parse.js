import fs from 'fs';
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

export { parseFile };
