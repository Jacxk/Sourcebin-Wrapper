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

# Methods
### create([BinFile], BinOptions?)
```javascript
SourceBin.create([
    new SourceBin.BinFile({
        name: 'index.js',
        content: 'This was created using the wrapper\n\nlanguageId: "js"',
        languageId: 'js'
    })
], {
    title: 'Some test',
    description: 'This is awesome'
})
    .then(console.log)
    .catch(console.error);

```
Language defaults to **Text**, if invalid or no language provided.

### upload(path, BinOptions?)
```js
// Upload single file
SourceBin.upload('path/to/file', { title: 'Upload file' })
    .then(console.log)
    .catch(console.error);

// Upload entire folder
SourceBin.upload('path/to/folder', { title: 'Upload folder' })
    .then(console.log)
    .catch(console.error);
```
Language is detected by the file extension, and name as well.

### newBin(contents, lang?, name?, BinOptions?)
```js
SourceBin.newBin('Using wrapper', 'txt', 'wrapper', {
    title: 'Some test',
    description: 'This is awesome'
})
    .then(console.log)
    .catch(console.error);
```

### get(url | key)
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
  "shortened": "https://srcb.in/d4ad855543",
  "created": "2020-03-17T21:12:30.549Z",
  "files": [
    {
      "raw": "https://sourceb.in/raw/d4ad855543/0",
      "content": "This was created using the wrapper\n\nlanguageId: \"js\"",
      "languageId": 183,
      "language": {
        "name": "JavaScript",
        "extension": "js",
        "aliases": [
          "js",
          "node"
        ],
        "aceMode": "javascript"
      }
    }
  ]
}
```

# Options

#### BinFileOptions:
This is for creating BinFiles

* `content`: The contents of what you're uploading
* `name` \<optional>: The name of the file to be uploaded
* `languageId`\<optional>: Language of the contents you're uploading

#### BinOptions:
This is for creating Bins

* `title`\<optional>: The title of the bin
* `description`\<optional>: The description of the bin

*Note: BinFile is for the contents of each Bin. A Bin can contain multiple BinFiles*