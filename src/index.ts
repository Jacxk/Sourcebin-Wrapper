import fetch from 'node-fetch';

const { version } = require('../package.json');
const linguist = require('@sourcebin/linguist/dist/linguist.json');

const [
    url_long,
    url_short,
    ...urls
] = [
    'https://sourceb.in',
    'https://srcb.in',
    'sourceb.in',
    'srcb.in'
];

export class Bin {
    public key: string;
    public files: Array<BinFile>;
    public created: Date;
    public url: string;
    public shortened: string;

    constructor(options: BinOptions) {
        this.key = options.key;
        this.url = `${ url_long }/${ this.key }`;
        this.shortened = `${ url_short }/${ this.key }`;
        this.created = options.created;
        this.files = options.files;
    }
}

export class BinFile {
    public raw: string;
    public content: string;
    public language: Language;
    public languageId: number;

    constructor(options: BinFileOptions) {
        this.raw = `${ url_long }/${ options.raw }`;
        this.content = options.content;
        this.languageId = getLanguageId(options.languageId) || 372;
        this.language = linguist[this.languageId];
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
    raw?: string;
    content: string;
    languageId?: number | string;
}

interface Language {
    name: string;
    aceMode: string;
    aliases?: Array<string>;
    extension: string;
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

    const { files, key, created }: Bin = await fetch(`${ url_long }/api/bins/${ k }`, {
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'SourceBin Wrapper/' + version
        },
        method: 'get'
    })
        .then(checkStatus)
        .then(res => res.json());

    const binFiles: Array<BinFile> = [];

    files.forEach((file, index) => {
        binFiles.push(new BinFile({
            content: file.content,
            languageId: file.languageId,
            raw: `${ key }/${ index }`
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
                return {
                    content: file.content,
                    languageId: file.languageId
                };
            })
    };

    const { key, message } = await fetch(`${ url_long }/api/bins`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'SourceBin Wrapper/' + version
        },
        body: JSON.stringify(body)
    })
        .then(checkStatus)
        .then(res => res.json());

    if (message) {
        return message;
    }

    return new Bin({
        key: key,
        created: new Date(),
        files: binFiles.map((file, i) => {
            return {
                ...file.object(),
                raw: `${ url_long }/${ key }/${ i }`
            };
        })
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