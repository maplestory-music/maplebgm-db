const bgmDatabase = require('./bgm');

describe('bgm database', () => {
  test('should be sorted by filename', () => {
    let songNames = bgmDatabase.map(song => song.filename);
    let sortedSongNames = bgmDatabase.map(song => song.filename);
    sortedSongNames.sort((a, b) =>
      a.localeCompare(b, 'en', {ignorePunctuation: true}));
    expect(songNames).toEqual(sortedSongNames);
  });
});
