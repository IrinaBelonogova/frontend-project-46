import formatStylish from './formatStylish.js';
import formatPlain from './frmatPlain.js';
import formatJson from './formatJson.js';

const formats = {
    stylish: formatStylish,
    plain: formatPlain,
    json: formatJson,
};

const formatDiff = (diff, formatName) => {
    const formatter = formats[formatName];
    if (!formatter) {
        throw new Error(`Unknown format: ${formatName}`);
    }
    return formatter(diff);
};

export default formatDiff;
