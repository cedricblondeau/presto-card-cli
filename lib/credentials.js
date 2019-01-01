const os = require('os');

const keychain = require('keychain');
const keytar = require('keytar');

const keychainServiceName = 'Presto card';

function getPasswordForMacFallback(username) {
  return new Promise((resolve, reject) => {
    keychain.getPassword(
      { account: username, service: keychainServiceName },
      (err, password) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(password);
      },
    );
  });
}

async function getPassword(username) {
  let password;
  try {
    password = await keytar.getPassword(keychainServiceName, username);
  } catch (e) {
    if (os.type() !== 'Darwin') {
      throw e;
    }
    password = getPasswordForMacFallback(username);
  }
  return password;
}

function setPassword(username, password) {
  return keytar.setPassword(keychainServiceName, username, password);
}

module.exports = {
  getPassword,
  setPassword,
};
