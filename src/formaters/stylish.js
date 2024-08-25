// Рекурсивная функция для форматирования различий в стильный вывод
function formatStylish(diff, depth = 0) {
    const indent = '    '.repeat(depth); // Определяем отступ для уровня вложенности
    const lines = [];

    for (const key in diff) {
        const { status, value1, value2 } = diff[key];

        switch (status) {
            case 'added':
                lines.push(`${indent}+ ${key}: ${formatValue(value2)}`);
                break;
            case 'removed':
                lines.push(`${indent}- ${key}: ${formatValue(value1)}`);
                break;
            case 'changed':
                lines.push(`${indent}- ${key}: ${formatValue(value1)}`);
                lines.push(`${indent}+ ${key}: ${formatValue(value2)}`);
                break;
            default:
                lines.push(`${indent} ${key}: ${formatValue(value1)}`);
        }
    }

    return `{\n${lines.join('\n')}\n${indent}}`;
}

// Функция для форматирования значений
function formatValue(value) {
    if (typeof value === 'object' && value !== null) {
        return '[complex object]';
    }
    return JSON.stringify(value);
}

export default formatStylish;