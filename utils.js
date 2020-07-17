const fs = require('fs');
const path = require('path');

function traverseDirectory(dir) {
  const files = [];
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      files.push(...traverseDirectory(fullPath));
    } else {
      files.push(fullPath);
    }
  });
  return files;
}

function getBgmDatabase(dir) {
  const bgmCollection = [];
  traverseDirectory(dir)
    .filter((fullPath) => path.extname(fullPath) === '.json')
    .forEach((fullPath) => {
      bgmCollection.push(...JSON.parse(fs.readFileSync(fullPath, 'utf8')));
    });
  return bgmCollection;
}

function mergeBgmDatabase(dir) {
  const db = getBgmDatabase(dir);
  fs.writeFileSync('bgm.min.json', JSON.stringify(db));
}

module.exports = {
  traverseDirectory,
  getBgmDatabase,
  mergeBgmDatabase,
};
