#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import arg from 'arg';
import { promisify } from 'util';
import appRoot from 'app-root-path';

const lstat = promisify(fs.lstat);
const readdir = promisify(fs.readdir);

const warning = message => chalk`{yellow WARNING:} ${message}`;
const info = message => chalk`{magenta INFO:} ${message}`;
const error = message => chalk`{red ERROR:} ${message}`;

const args = arg({
    '--directory': String,
});

const directory = args['--directory'];

const rootPath = path.join(appRoot.path, directory);

const getDirectoryContent = dirPath => lstat(dirPath, false)
    .then((stat) => {
        if (stat.isDirectory()) {
            readdir(dirPath)
                .then((dirContent) => {
                    if (!Array.isArray(dirContent) || !dirContent.length) {
                        // If directory contents is empty
                        console.warn(warning(`The directory ${directory} is empty`));
                    } else {
                        let indexFileContents = '';
                        dirContent.map((item) => {
                            
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log('no content');
        }
    })
    .catch((err) => {
        if (err.code === 'ENOENT') {
            console.error(
                error(
                    `The path ${
                        err.path
                    } is invalid, this most likely means the directory ${directory} does not exist`,
                ),
            );
        } else {
            console.log(err);
        }
    });

getDirectoryContent(rootPath);
