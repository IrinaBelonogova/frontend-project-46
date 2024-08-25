import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

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
