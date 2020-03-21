#!/usr/bin/env node

const fs = require('fs');

const message = fs
    .readFileSync(process.argv[2], 'utf8')
    .trim()
    .toLowerCase();

try {
    if (message.startsWith('fix:')) {
        const packJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
        const version = packJson.version.split('.');

        version[2] = (parseInt(version[2]) + 1) + '';

        packJson.version = version.join('.');

        fs.writeFileSync('./package.json', JSON.stringify(packJson, null, 2));

        console.log(`Version updated to ${version.join('.')}`);
    } else if (message.toLowerCase().startsWith('feat:')) {
        const packJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
        const version = packJson.version.split('.');

        version[1] = (parseInt(version[1]) + 1) + '';
        version[2] = '0';

        packJson.version = version.join('.');

        fs.writeFileSync('./package.json', JSON.stringify(packJson, null, 2));

        console.log(`Version updated to ${version.join('.')}`);
    } else {
        console.warn("Use 'fix:' or 'feat:' at the beginning of your commit message to update the version.");
    }
    process.exit(0);
} catch (e) {
    console.error(e);
    process.exit(1);
}