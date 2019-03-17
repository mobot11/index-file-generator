#!/usr/bin/env node

import path from 'path';
import arg from 'arg';
import appRoot from 'app-root-path';
import fs from 'fs';

import {
    isDirectoryAsync,
    isDirectory,
    readDirectory,
    error,
    warning,
    info,
    filePath,
    commandArgs,
    processExport,
} from './utils';

const args = arg({
    '--directory': String,
    '--generate-single': Boolean,
    '--generate-multiple': Boolean,
    '--ignore-path': String,
    '--ignore-file': String,
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
            let fileContent = '';
            content.map((item) => {
                const currPath = path.join(dirPath, item);

                const ignorePath = args['--ignore-path'];
                if (Array.isArray(ignorePath) && ignorePath.length > 0) {
                    ignorePath.map((single) => {
                        if (currPath.includes(single)) {
                            console.info(
                                info(
                                    `Ignoring ${filePath(
                                        dirPath,
                                    )}`,
                                ),
                            );
                        }
                    });
                } else if (typeof ignorePath === 'string' || ignorePath instanceof String) {
                    if (currPath.includes(ignorePath)) {
                        console.info(
                            info(
                                `Ignoring ${filePath(
                                    dirPath,
                                )}`,
                            ),
                        );
                    }
                } else if (!isDirectory(currPath)) {
                    const fileExports = require(currPath);
                    if (
                        Object.entries(fileExports).length === 0
                        && fileExports.constructor === Object
                    ) {
                        console.warn(
                            warning(
                                `The file ${filePath(
                                    currPath,
                                )} contains no exports`,
                            ),
                        );
                    }
                    Object.keys(fileExports).map((fileExport) => {
                        fileContent += processExport(fileExport, args, item, ignorePath);
                    });
                }
            });
            if (!fileContent.length) {
                console.info(
                    info(
                        `No exports were found in ${filePath(
                            dirPath,
                        )}, no import file was generated.`,
                    ),
                );
            } else {
                fs.writeFile(path.join(dirPath, 'index.js'), fileContent, 'utf8', (err) => {
                    if (err) {
                        throw err;
                    } else {
                        console.info(
                            info(
                                `index.js file created in ${filePath(
                                    dirPath,
                                )}.`,
                            ),
                        );
                    }
                });
            }
        }
    } catch (e) {
        console.error(error(e));
    }
}

generateIndexFiles(directory, appRoot);
