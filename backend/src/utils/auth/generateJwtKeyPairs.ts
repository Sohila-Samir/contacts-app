import crypto from "crypto";
import fs from "fs";

// access token key value pairs
const generateAccessTknPairs = () => {
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
};

/* -------------------------------------------------------------------*/

// refresh token key value pairs
const generateRefreshTknPairs = () => {
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
};

generateAccessTknPairs();
generateRefreshTknPairs();
