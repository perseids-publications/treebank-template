// This function is required by Alpheios messaging
// which uses the https://github.com/uuidjs/uuid package
// that relies on `window.crypto.getRandomValues`
global.crypto = {
  getRandomValues: array => array.map(() => Math.random()),
};

process.env.PUBLIC_URL = 'https://www.example.com';
