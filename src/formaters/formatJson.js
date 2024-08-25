const formatJson = (diff) => {
    return JSON.stringify(diff, null, 2); // Форматируем с отступом 2 пробела
};

export default formatJson;