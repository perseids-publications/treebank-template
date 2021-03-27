// This function is required by Alpheios Messaging
// which uses the https://github.com/uuidjs/uuid package
// that relies on `window.crypto.getRandomValues`
global.crypto = {
  getRandomValues: (array) => array.map(() => Math.random()),
};

// This is used in tests that rely on the callback functionality
// in Treebank React's `<Sentence>` component. When the sentence is
// loaded, it normally calls the given callback with the sentence XML
// converted to JSON. If this variable is set, then the sentence mock
// calls the callback with the value.
global.treebankCallbackValue = false;

// Necessary for testing parts of the code that rely on the
// public URL.
process.env.PUBLIC_URL = 'https://www.example.com';
