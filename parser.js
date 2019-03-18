const LineByLineReader = require('line-by-line');
const lr = new LineByLineReader('animations.txt');
const fs = require('fs');

const resultList = new Map();

lr.on('line', (line) => {
	const splittedLine = line.split(' ');
  const dict = splittedLine[0];
  const animName = splittedLine[1];
  const defined = resultList.get(dict);
  if (defined) {
    defined.push(animName);
  } else {
    resultList.set(dict, [animName]);
  }
});

lr.on('end', () => {
	const json = JSON.stringify([...resultList]);
  fs.writeFile('./anim-list.json', json, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Animation list has been generated.');
  });
  fs.writeFile('./anim-list.ts', `export const animList: string[][] = ${json};`, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Animation list TS file has been generated.');
  });
  const resultMap = {};
  [...resultList].forEach((dict, index) => {
    resultMap[dict[0]] = [
      index,
      dict[1].reduce((res, anim, index) => {
        res[anim] = index;
        return res;
      }, {})
    ]
  });
  const jsonResultMap = JSON.stringify(resultMap);
  fs.writeFile('./anim-map.ts', `const animMap: {[key: string]: any[]} = ${jsonResultMap};`, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Animation map TS file has been generated.');
  });
  fs.writeFile('./anim-map.json', jsonResultMap, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Animation map has been generated.');
  });
});
