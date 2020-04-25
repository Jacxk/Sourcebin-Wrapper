import fetch from 'node-fetch';

const { version } = require('../package.json');
const linguist = require('@sourcebin/linguist/dist/linguist.json');

const [
    url_long, ...urls 
] = [
    'https://sourceb.in', 'sourceb.in', 'srcb.in' 
];

export class Bin {
    public key: string;
    public files: Array<BinFile>;
    public created: Date;
    public url: string;

    constructor(options: BinOptions) {
        this.key = options.key;
        this.url = `${ url_long }/${ this.key }`;
        this.created = options.created;
        this.files = options.files;
    }
}

export class BinFile {
    public languageId: number;
    public language?: Language;
    public content: string;

    constructor(options: BinFileOptions) {
        this.languageId = getLanguageId(options.languageId) || 372;
        this.language = linguist[this.languageId];
        this.content = options.content;
    }

    public object(): any {
        return Object.assign({}, this);
    }
}

interface BinOptions {
    key: string;
    files: Array<BinFile>;
    created: Date;
}

interface BinFileOptions {
    content: string;
    languageId?: number | string;
}

interface Language {
    name: string;
    extension: string;
    aliases?: Array<string>;
    aceMode: string;
}

export async function get(k: string): Promise<Bin> {
    if (/((https?)(:\/\/))?(.+)\.(.*)\/?/.test(k)) {
        if (urls.filter(url => k.includes(url))) {

            const [
                match, , , , key 
            ] = k.match(/s((ource)|(rc))b\.in\/(\S+)/) || [];

            if (!match) {
                return Promise.reject('Url must have a valid path!');
            }

            k = key.replace(/\//g, '');
        } else {
            return Promise.reject(`Url must be a valid '${ urls.join(' or ') }' url!`);
        }
    }

    const { files, key, created } = await fetch(`${ url_long }/api/bins/${ k }`, {
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'SourceBin Wrapper/' + version
        },
        method: 'get'
    }).then(checkStatus)
        .then(res => res.json());

    const binFiles: Array<BinFile> = [];

    files.forEach(file => {
        binFiles.push(new BinFile({
            content: file.content,
            languageId: file.languageId
        }));
    });

    return new Bin({
        files: binFiles,
        key: key,
        created: created
    });
}

export async function create(binFiles: Array<BinFile>): Promise<Bin | string> {
    if (!binFiles || binFiles.length < 1) {
        throw 'Cannot create from empty bin array';
    }

    const body = {
        files: binFiles
            .map(file => file.object())
            .map(file => {
                return { content: file.content, languageId: file.languageId };
            })
    };

    const { key, message } = await fetch(`${ url_long }/api/bins`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'SourceBin Wrapper/' + version
        },
        body: JSON.stringify(body)
    }).then(checkStatus)
        .then(res => res.json());

    if (message) {
        return message;
    }

    return new Bin({
        key: key,
        created: new Date(),
        files: binFiles
    });
}

export function getLanguageId(lang: string | number): number {
    if (!lang) return null;

    if (typeof lang === 'number') return lang;

    lang = lang.toLowerCase();

    const extension = Object
        .keys(linguist)
        .find(key => linguist[key].extension === lang);
    if (extension) return Number(extension);

    const name = Object
        .keys(linguist)
        .find(key => linguist[key].name.toLowerCase() === lang);
    if (name) return Number(name);

    return null;
}

function checkStatus(res) {
    if (res.ok) {
        return res;
    } else {
        throw Error(res.statusText);
    }
}