const fs = require('fs');
const path = require('path');
const jsoncParser = require('jsonc-parser');

const locales = ['ko', 'ja', 'zh-CN', 'zh-TW'];

function traverseDirectory(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return [];
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

function mergeLocaleData(db) {
  locales.forEach((locale) => {
    const localeDb = getBgmDatabase(`./locale/${locale}`);
    localeDb.forEach((song) => {
      const { filename } = song;
      const entryInDb = db.find((dbSong) => dbSong.filename === filename);
      if (entryInDb) {
        entryInDb.locale = entryInDb.locale || {};
        entryInDb.locale[locale] = song;
      }
    });
  });
}

function getPlaylists(dir) {
  const playlists = [];
  traverseDirectory(dir)
    .filter((fullPath) => path.extname(fullPath) === '.jsonc')
    .forEach((fullPath) => {
      playlists.push(jsoncParser.parse(fs.readFileSync(fullPath, 'utf8')));
    });
  return playlists;
}

function mergeBgmDatabase(dir, playlistDir) {
  const db = getBgmDatabase(dir);
  mergeLocaleData(db);
  fs.writeFileSync('bgm.min.json', JSON.stringify(db));
  const playlists = getPlaylists(playlistDir);
  fs.writeFileSync('playlist.min.json', JSON.stringify(playlists));
}

module.exports = {
  traverseDirectory,
  getBgmDatabase,
  mergeBgmDatabase,
};
