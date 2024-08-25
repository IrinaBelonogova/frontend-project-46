const fs = require('fs');

function compareJSON(json1, json2, path = '') {
    let differences = {};

    // Получаем все уникальные ключи из обоих объектов
    const allKeys = new Set([...Object.keys(json1), ...Object.keys(json2)]);

    allKeys.forEach(key => {
        const newPath = path ? `${path}.${key}` : key;

        // Если ключ отсутствует в одном из объектов
        if (!(key in json1)) {
            differences[newPath] = {
                status: 'added',
                value: json2[key]
            };
        } else if (!(key in json2)) {
            differences[newPath] = {
                status: 'removed',
                value: json1[key]
            };
        } else {
            // Если значение - это вложенный объект (plain object)
            if (typeof json1[key] === 'object' && json1[key] !== null && typeof json2[key] === 'object' && json2[key] !== null) {
                const nestedDiffs = compareJSON(json1[key], json2[key], newPath);
                Object.assign(differences, nestedDiffs);
            } else {
                // Значения различаются
                if (json1[key] !== json2[key]) {
                    differences[newPath] = {
                        status: 'changed',
                        value1: json1[key],
                        value2: json2[key]
                    };
                }
            }
        }
    });

    return differences;
}

// Загрузка данных из файлов
fs.readFile('file1.json', 'utf8', (err, data1) => {
    if (err) throw err;
    fs.readFile('file2.json', 'utf8', (err, data2) => {
        if (err) throw err;

        const file1Data = JSON.parse(data1);
        const file2Data = JSON.parse(data2);

        // Сравнение JSON объектов
        const diffResult = compareJSON(file1Data, file2Data);

        // Вывод различий
        console.log(JSON.stringify(diffResult, null, 2));
    });
});

export default compareJSON;
