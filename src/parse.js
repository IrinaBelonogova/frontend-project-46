const fs = require('fs');

const parseFile = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading file:', err);
    return null;
  }
};

export { parseFile };