/*fs 
import { parseFile } from "./parse";

const absolutePath1 = path.resolve(process.cwd(), filepath1);
const absolutePath2 = path.resolve(process.cwd(), filepath2);

export default (absolutePath1, absolutePath2) => {

    const data1 = parseFile(absolutePath1);
    const data2 = parseFile(absolutePath2);

    if (data1 !== null && data2 !== null) {
      const difference = genDiff(data1, data2);
      console.log(`Comparing ${absolutePath1} and ${absolutePath2} in ${program.format} format`);
      console.log(difference);
    } else {
      console.error('Error reading one or both files.');
    }
  }*/
 
import path from 'path';
import { readFileSync } from 'fs';
import parse from './parser.js';
import formatDiff from './formatters/index.js';
import buildTree from './buildTree.js';


const getTypeFile = (pathFile) => path.extname(pathFile).slice(1); //  определяет тип файла по его расширению
const getData = (filepath) => parse(readFileSync(filepath, 'utf-8'), getTypeFile(filepath)); // читает содержимое файла и парсит его в зависимости от типа файла
const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath); // создает полный путь к файлу, используя текущую рабочую директорию

export default (pathFile1, pathFile2, formatName = 'stylish') => {
  const dataFile1 = getData(buildFullPath(pathFile1)); // получаем данные из первого файла
  const dataFile2 = getData(buildFullPath(pathFile2)); // получаем данные из второго файла
  const diff = buildTree(dataFile1, dataFile2); // Строим дерево различий между двумя наборами данных
  return formatDiff(diff, formatName);
};
