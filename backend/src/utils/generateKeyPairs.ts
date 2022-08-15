import crypto from 'crypto';
import fs from 'fs';

const generateKeyValuePairs = (() => {
	const keyPairs = crypto.generateKeyPairSync('rsa', {
		modulusLength: 4096,
		publicKeyEncoding: {
			type: 'pkcs1',
			format: 'pem',
		},
		privateKeyEncoding: {
			type: 'pkcs1',
			format: 'pem',
		},
	});
	fs.writeFileSync(__dirname + '/PUB_KEY.pem', keyPairs.publicKey);
	fs.writeFileSync(__dirname + '/PRV_KEY.pem', keyPairs.privateKey);
})();
