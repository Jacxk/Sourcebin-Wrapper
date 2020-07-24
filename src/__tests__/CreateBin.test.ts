import * as SourceBin from '../index';

SourceBin.newBin('Using wrapper', 'txt', 'wrapper', {
    title: 'Some test',
    description: 'This is awesome'
})
    .then(console.log)
    .catch(console.error);

SourceBin.upload('path/to/file', { title: 'Upload file' })
    .then(console.log)
    .catch(console.error);

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
