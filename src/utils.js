import fs from 'fs';
import { promisify } from 'util';
import chalk from 'chalk';

const lstat = promisify(fs.lstat);
const readdir = promisify(fs.readdir);

const warning = message => chalk`{yellow WARNING:} ${message}`;
const info = message => chalk`{magenta INFO:} ${message}`;
const error = message => chalk`{red ERROR:} ${message}`;
const filePath = message => chalk.green(`"${message}"`);
const commandArgs = message => chalk.blue(message);

function isDirectoryAsync(source) {
    return new Promise((resolve, reject) => {
        lstat(source, false).then((stat) => {
            resolve(stat.isDirectory());
        }).catch((err) => {
            reject(err);
        });
    });
}

function isDirectory(source) {
    return fs.lstatSync(source).isDirectory();
}

function readDirectory(source) {
    return new Promise((resolve, reject) => {
        readdir(source).then((dirContents) => {
            resolve(dirContents);
        }).catch((err) => {
            reject(err);
        });
    });
}
// eslint-disable-next-line
function processExport(fileExport, args, item, ignorePath) {
    const ignoreFile = args['--ignore-file'];
    if (fileExport === 'default') {
        // eslint-disable-next-line
        return `export { default as ${fileExports.default.name ? fileExports.default.name : fileExports.default.__exportName} } from './${item}';\n`;
    } if (Array.isArray(ignoreFile) && ignoreFile.length > 0) {
        ignoreFile.map((single) => {
            if (item.includes(single)) {
                console.info(
                    info(
                        `Ignoring ${filePath(
                            item,
                        )}`,
                    ),
                );
            }
        });
    } else if (typeof ignorePath === 'string' || ignorePath instanceof String) {
        if (item.includes(ignorePath)) {
            console.info(
                info(
                    `Ignoring ${filePath(
                        item,
                    )}`,
                ),
            );
        }
    } else if (item !== 'index.js') {
        return `export { ${fileExport} } from './${item}';\n`;
    }
}

// function readDirectory()

export {
    isDirectoryAsync,
    isDirectory,
    readDirectory,
    warning,
    info,
    error,
    filePath,
    processExport,
    commandArgs,
};
