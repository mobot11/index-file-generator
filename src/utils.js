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

// function readDirectory()

export {
    isDirectoryAsync,
    isDirectory,
    readDirectory,
    warning,
    info,
    error,
    filePath,
    commandArgs,
};
