#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import arg from 'arg';

const warning = message => chalk`{yellow WARNING:} ${message}`;
const info = message => chalk`{magenta INFO:} ${message}`;
const error = message => chalk`{red ERROR:} ${message}`;

const args = arg({
    '--help': Boolean,
    '--entry': String,
    '--recursive': Boolean,
    '--ignore': String,
    '--include': String,
});

console.log(args);
