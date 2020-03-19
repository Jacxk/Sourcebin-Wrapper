# SourceBin Wrapper

[![](https://img.shields.io/npm/v/sourcebin-wrapper?label=Latest%20Version&style=for-the-badge)](https://www.npmjs.com/package/sourcebin-wrapper)
[![](https://img.shields.io/github/issues-raw/Jacxk/sourcebin-wrapper?label=Open%20Issues&style=for-the-badge)](https://github.com/Jacxk/Sourcebin-Wrapper/issues)
[![](https://img.shields.io/npm/dw/sourcebin-wrapper?label=Downloads&style=for-the-badge)](https://www.npmjs.com/package/sourcebin-wrapper)
[![](https://img.shields.io/github/package-json/author/Jacxk/sourcebin-wrapper?style=for-the-badge)](https://www.npmjs.com/package/sourcebin-wrapper)


With this wrapper you can create and get bins from https://sourceb.in/

### Install
`npm i sourcebin-wrapper --save`

### Initialize
```javascript
// typescript
import * as SourceBin from 'sourcebin-wrapper';

// Node/JavaScript
const SourceBin = require('sourcebin-wrapper');
```

### Create
```javascript
SourceBin.create([
    new SourceBin.BinFile({
        content: 'This was created using the wrapper\n\nlanguageId: "js"',
        languageId: 'js'
    })
]).then(console.log)
  .catch(console.error);
```
Language defaults to **Text**, if invalid or no language provided.

### Get
```javascript
// Get bin using its key
SourceBin.get("d4ad855543").then(console.log);

// Get bin using its url
SourceBin.get("https://sourceb.in/d4ad855543").then(console.log);
```

#### Sample Output
Output for both **create** and **get**
```json
{
  "key": "d4ad855543",
  "url": "https://sourceb.in/d4ad855543",
  "created": "2020-03-17T21:12:30.549Z",
  "files": [
    {
      "languageId": 183,
      "language": {
        "name": "JavaScript",
        "extension": "js",
        "aliases": [
          "js",
          "node"
        ],
        "aceMode": "javascript"
      },
      "content": "This was created using the wrapper\n\nlanguageId: \"js\""
    }
  ]
}
```
