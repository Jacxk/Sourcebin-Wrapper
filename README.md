# SourceBin Wrapper

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
SourceBin.get("d4ad855543").then(console.log);
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
