[![Build Status](https://github.com/maplestory-music/maplebgm-db/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/maplestory-music/maplebgm-db/actions/workflows/build.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

# maplebgm-db

Definitive MapleStory music database

## Description

This database is a record of all MapleStory background music tracks and related
metadata. A visual representation of the data can be found at
[MapleStory Music](https://maplestory-music.github.io/).

## Scope

The scope of this project is limited to [MapleStory](https://wikipedia.org/wiki/MapleStory),
originally published in 2003. It does not cover other titles within the franchise.

## Installation

Use Yarn to install development dependencies for this project.

## Development and Usage

The database is stored in `./bgm`, tests are specified in `bgm.test.js`, and
schema defined in `schema.json`. Changes to the database partitions should
pass the specified test cases and validate against the JSON schema.

Tests can be run through Jest.

```bash
yarn test
```

## Versioning

Releases are cut at the beginning of every quarter, following a `YYYY.Q`
format. The contents of a typical release will include new song additions
from the previous quarter, along with any modifications to the database
during that time.

## License

[MIT](LICENSE)
