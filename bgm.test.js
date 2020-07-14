const Ajv = require('ajv');
const schema = require('./schema');
const bgmDatabase = require('./bgm');

describe('bgm database', () => {
  test('should adhere to json schema', () => {
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);
    const valid = validate(bgmDatabase);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toEqual(true);
  });
  test('should be sorted by filename', () => {
    const songNames = bgmDatabase.map((song) => song.filename);
    const sortedSongNames = bgmDatabase
      .map((song) => song.filename)
      .sort((a, b) => a.localeCompare(b, 'en', { ignorePunctuation: true }));
    expect(songNames).toEqual(sortedSongNames);
  });
  test('should have unique filenames', () => {
    const songNames = bgmDatabase.map((song) => song.filename);
    const distinctSongNames = new Set(songNames);
    expect(songNames.length).toEqual(distinctSongNames.size);
  });
  test('should have unique youtube identifiers', () => {
    const youtube = bgmDatabase
      .map((song) => song.youtube)
      .filter((id) => id !== '');
    const duplicates = youtube.filter((e, i, a) => a.indexOf(e) !== i);
    expect(duplicates).toEqual([]);
  });
});
