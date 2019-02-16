#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import arg from 'arg';
import { promisify } from 'util';
import appRoot from 'app-root-path';

import {
    isDirectory,
} from './utils';

const lstat = promisify(fs.lstat);
const readdir = promisify(fs.readdir);

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
    const isDir = await isDirectory(dirpath);

    console.log(isDir);
}

const generateIndexFiles = (dir, root) => {
    const dirPath = path.join(root.path, dir);
    getDirectoryContent(dirPath);
};

generateIndexFiles(directory, appRoot);
