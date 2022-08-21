import crypto from "crypto";
import fs from "fs";

const generateAccessKeyValuePairs = (() => {
	const keyPairs = crypto.generateKeyPairSync("rsa", {
		modulusLength: 4096,
		publicKeyEncoding: {
			type: "pkcs1",
			format: "pem",
		},
		privateKeyEncoding: {
			type: "pkcs1",
			format: "pem",
		},
	});
	fs.writeFileSync(__dirname + "/PUB_KEY.pem", keyPairs.publicKey);
	fs.writeFileSync(__dirname + "/PRV_KEY.pem", keyPairs.privateKey);
})();

/* -------------------------------------------------------------------*/

const generateRefreshKeyValuePairs = (() => {
	const keyPairs = crypto.generateKeyPairSync("rsa", {
		modulusLength: 4096,
		publicKeyEncoding: {
			type: "pkcs1",
			format: "pem",
		},
		privateKeyEncoding: {
			type: "pkcs1",
			format: "pem",
		},
	});
	fs.writeFileSync(__dirname + "/PUB_KEY_REFRESH.pem", keyPairs.publicKey);
	fs.writeFileSync(__dirname + "/PRV_KEY_REFRESH.pem", keyPairs.privateKey);
})();
