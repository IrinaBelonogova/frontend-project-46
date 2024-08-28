const formatPlain = (diff) => {
    const iter = (node, path) => {
        const lines = [];

        for (const key in node) {
            const { status, value1, value2 } = node[key];
            const currentPath = path ? `${path}.${key}` : key;

            switch (status) {
                case 'added':
                    lines.push(`Property '${currentPath}' was added with value: ${formatValue(value2)}`);
                    break;
                case 'removed':
                    lines.push(`Property '${currentPath}' was removed`);
                    break;
                case 'changed':
                    lines.push(`Property '${currentPath}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`);
                    break;
                case 'unchanged':
                    // ничего не добавляем для неизменённых свойств
                    break;
                default:
                    throw new Error(`Unknown status: ${status}`);
            }
        }

        return lines;
    };

    const changes = iter(diff, '');
    return changes.join('\n');
};

const formatValue = (value) => {
    if (typeof value === 'object' && value !== null) {
        return '[complex object]';
    }
    return JSON.stringify(value);
};

export default formatPlain;