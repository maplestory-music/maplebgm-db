const Ajv = require('ajv');
const fs = require('fs');
const schema = require('./schema');
const utils = require('./utils');

const bgmDir = './bgm';

describe('bgm database', () => {
  test('should adhere to json schema', () => {
    const partitions = utils.traverseDirectory(bgmDir);
    partitions.forEach((file) => {
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(schema);
      const valid = validate(JSON.parse(fs.readFileSync(file, 'utf8')));
      if (!valid) {
        console.error(`Failed validaton on ${file}`);
        console.error(validate.errors);
      }
      expect(valid).toEqual(true);
    });
  });
  test('should be sorted by filename', () => {
    const partitions = utils.traverseDirectory(bgmDir);
    partitions.forEach((file) => {
      const db = JSON.parse(fs.readFileSync(file, 'utf8'));
      const songNames = db.map((song) => song.filename);
      const sortedSongNames = db
        .map((song) => song.filename)
        .sort((a, b) => a.localeCompare(b, 'en', { ignorePunctuation: true }));
      expect(songNames).toEqual(sortedSongNames);
    });
  });
  test('should have unique filenames', () => {
    const db = utils.getBgmDatabase(bgmDir);
    const songNames = db.map((song) => song.filename);
    const distinctSongNames = new Set(songNames);
    expect(songNames.length).toEqual(distinctSongNames.size);
  });
  test('should have unique youtube identifiers', () => {
    const db = utils.getBgmDatabase(bgmDir);
    const youtube = db.map((song) => song.youtube).filter((id) => id !== '');
    const duplicates = youtube.filter((e, i, a) => a.indexOf(e) !== i);
    expect(duplicates).toEqual([]);
  });
});
