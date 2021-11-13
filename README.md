@xingrz/decompress-targz [![test](https://github.com/xingrz/decompress-targz/actions/workflows/test.yml/badge.svg)](https://github.com/xingrz/decompress-targz/actions/workflows/test.yml)
==========

[![][npm-version]][npm-url] [![][npm-downloads]][npm-url] [![license][license-img]][license-url] [![issues][issues-img]][issues-url] [![stars][stars-img]][stars-url] [![commits][commits-img]][commits-url]

[@xingrz/decompress](https://github.com/xingrz/decompress) .tar.gz plugin.

## Install

```sh
npm install --save @xingrz/decompress-targz
```

## Usage

```ts
import decompress from '@xingrz/decompress';
import decompressTargz from '@xingrz/decompress-targz';

(async () => {
	await decompress('unicorn.tar.gz', 'dist', {
		plugins: [
			decompressTargz()
		]
	});

	console.log('Files decompressed');
})();
```

## API

### `decompressTargz(): (input: Buffer | Readable) => Promise<File[]>`

Returns a `Promise<File[]>`.

#### input

Type: `Buffer` or [`stream.Readable`](https://nodejs.org/dist/latest-v16.x/docs/api/stream.html#class-streamreadable)

Buffer or stream to decompress.

## License

[MIT License](LICENSE)

[npm-version]: https://img.shields.io/npm/v/@xingrz/decompress-targz.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/@xingrz/decompress-targz.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@xingrz/decompress-targz
[license-img]: https://img.shields.io/github/license/xingrz/decompress-targz?style=flat-square
[license-url]: LICENSE
[issues-img]: https://img.shields.io/github/issues/xingrz/decompress-targz?style=flat-square
[issues-url]: https://github.com/xingrz/decompress-targz/issues
[stars-img]: https://img.shields.io/github/stars/xingrz/decompress-targz?style=flat-square
[stars-url]: https://github.com/xingrz/decompress-targz/stargazers
[commits-img]: https://img.shields.io/github/last-commit/xingrz/decompress-targz?style=flat-square
[commits-url]: https://github.com/xingrz/decompress-targz/commits/master
