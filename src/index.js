#!/usr/bin/env node

import path from 'path';
import arg from 'arg';
import appRoot from 'app-root-path';

import {
    isDirectoryAsync,
    isDirectory,
    readDirectory,
    error,
    warning,
    info,
    filePath,
    commandArgs,
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
        const isDir = await isDirectoryAsync(dirPath);
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
        } else {
            console.error(e);
        }
    }
    return '';
}

async function generateIndexFiles(dir, root) {
    if (!dir) {
        console.error(
            error(
                `the ${commandArgs('--directory')} argument is required when using ${commandArgs(
                    'generate-index-files',
                )}.`,
            ),
        );
        return;
    }
    const dirPath = path.join(root.path, dir);

    try {
        const content = await getDirectoryContent(dirPath);
        if (!Array.isArray(content) || content.length < 1) {
            console.error(error(`The directory ${filePath(dirPath)} is empty.`));
            return;
        }
        if (!args['--recursive']) {
            const fileContent = '';
            content.map((item) => {
                if (!isDirectory(path.join(dirPath, item))) {
                    const fileExports = require(path.join(dirPath, item));
                    if (
                        Object.entries(fileExports).length === 0
                        && fileExports.constructor === Object
                    ) {
                        console.warn(
                            warning(
                                `The file ${filePath(
                                    path.join(dirPath, item),
                                )} contains no exports`,
                            ),
                        );
                    }
                    if (!fileContent) {
                        console.info(
                            info(
                                `No exports were found in ${filePath(
                                    dirPath,
                                )}, no import file was generated.`,
                            ),
                        );
                    }
                }
            });
        }
    } catch (e) {
        console.error(error(e));
    }
}

generateIndexFiles(directory, appRoot);
