#!/usr/bin/env node

import path from 'path';
import arg from 'arg';
import appRoot from 'app-root-path';

import {
    isDirectory, readDirectory, error, filePath, commandArgs,
} from './utils';

const args = arg({
    '--directory': String,
    '--generate-single': Boolean,
    '--generate-multiple': Boolean,
    '--ignore-path': String,
    '--include-path': String,
    '--recursive': Boolean,
});

const directory = args['--directory'];

async function getDirectoryContent(dirPath) {
    try {
        const isDir = await isDirectory(dirPath);
        if (isDir) {
            try {
                const dirContents = await readDirectory(dirPath);
                return dirContents;
            } catch (e) {
                console.error(e);
            }
        }
    } catch (e) {
        if (e.code === 'ENOENT') {
            console.error(error(`The file or directory ${filePath(e.path)} does not exist.`));
        }
    }
    return '';
}

async function generateIndexFiles(dir, root) {
    if (!dir) {
        console.error(error(`the ${commandArgs('--directory')} command line argument is required when using ${commandArgs('generate-index-files')}.`));
        return;
    }
    const dirPath = path.join(root.path, dir);

    try {
        const content = await getDirectoryContent(dirPath);
        if (!Array.isArray(content) || content.length > 1) {
            console.error(error(`The directory ${filePath(dirPath)} is empty.`));
            return;
        }
        if (!args['--recursive']) {
            const fileContent = '';

            content.map(item => console.log(item));
        }
    } catch (e) {
        console.error(error(e));
    }
}

generateIndexFiles(directory, appRoot);
