import fs from 'fs';
import { promisify } from 'util';
import chalk from 'chalk';

const lstat = promisify(fs.lstat);

const warning = message => chalk`{yellow WARNING:} ${message}`;
const info = message => chalk`{magenta INFO:} ${message}`;
const error = message => chalk`{red ERROR:} ${message}`;
const filePath = message => chalk.green(`"${message}"`);

async function isDirectory(dirPath) {
    try {
        const dirStat = await lstat(dirPath);
        return dirStat.isDirectory();
    } catch (e) {
        throw new Error(error(`The file or directory ${filePath(dirPath)} cannot be found`));
    }
}

export {
    isDirectory,
    warning,
    info,
    error,
    filePath,
};
