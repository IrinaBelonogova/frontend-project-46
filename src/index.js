
const absolutePath1 = path.resolve(process.cwd(), filepath1);
const absolutePath2 = path.resolve(process.cwd(), filepath2);

    const data1 = parseFile(absolutePath1);
    const data2 = parseFile(absolutePath2);

    if (data1 !== null && data2 !== null) {
      const difference = genDiff(data1, data2);
      console.log(`Comparing ${absolutePath1} and ${absolutePath2} in ${program.format} format`);
      console.log(difference);
    } else {
      console.error('Error reading one or both files.');
    }