const Ajv = require('ajv');
const schema = require('./schema');
const bgmDatabase = require('./bgm');

describe('bgm database', () => {
  test('should adhere to json schema', () => {
    let ajv = new Ajv({allErrors: true});
    let validate = ajv.compile(schema);
    let valid = validate(bgmDatabase);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toEqual(true);
  });
  test('should be sorted by filename', () => {
    let songNames = bgmDatabase.map(song => song.filename);
    let sortedSongNames = bgmDatabase.map(song => song.filename);
    sortedSongNames.sort((a, b) =>
      a.localeCompare(b, 'en', {ignorePunctuation: true}));
    expect(songNames).toEqual(sortedSongNames);
  });
  test('filename should be unique', () => {
    let songNames = bgmDatabase.map(song => song.filename);
    let distinctSongNames = new Set(songNames);
    expect(songNames.length).toEqual(distinctSongNames.size);
  });
});
