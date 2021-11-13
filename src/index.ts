import type { DecompressPlugin, DecompressPluginOptions } from '@xingrz/decompress-types';
import * as fileType from 'file-type';
import decompressTar from '@xingrz/decompress-tar';
import isStream from 'is-stream';
import { createGunzip } from 'zlib';

export default (): DecompressPlugin<DecompressPluginOptions> => async (input, opts) => {
	const isBuffer = Buffer.isBuffer(input);
	const type = isBuffer ? await fileType.fromBuffer(input) : null;

	if (!isBuffer && !isStream(input)) {
		throw new TypeError(`Expected a Buffer or Stream, got ${typeof input}`);
	}

	if (isBuffer && (!type || type.ext !== 'gz')) {
		return [];
	}

	const decompressor = createGunzip();
	const result = decompressTar()(decompressor, opts);

	if (isBuffer) {
		decompressor.end(input);
	} else {
		input.once('error', e => decompressor.emit('error', e));
		input.pipe(decompressor);
	}

	return result;
};
