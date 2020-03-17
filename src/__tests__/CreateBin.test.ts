import * as SourceBin from "../index";

SourceBin.create([
    new SourceBin.BinFile({
        content: "This was created using the wrapper\n\nlanguageId: \"js\"",
        languageId: "js"
    })
])
    .then(console.log)
    .catch(console.error);
