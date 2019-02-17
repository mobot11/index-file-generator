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

function isDirectory(dirPath) {
    return new Promise((resolve, reject) => {
        lstat(dirPath, false).then((stat) => {
            resolve(stat.isDirectory());
        }).catch((err) => {
            reject(err);
        });
    });
}

function readDirectory(dirPath) {
    return new Promise((resolve, reject) => {
        readdir(dirPath).then((dirContents) => {
            resolve(dirContents);
        }).catch((err) => {
            reject(err);
        });
    });
}

// function readDirectory()

export {
    isDirectory,
    readDirectory,
    warning,
    info,
    error,
    filePath,
    commandArgs,
};
