#!/usr/bin/env node
import cli from '../src/cli/cli.js';
import {
  config,
} from 'dotenv';
import {
  existsSync,
} from 'fs';

if (existsSync(process.cwd() + '/.env')) {
  config();
}

process.exit(await cli(process.argv, process.cwd(),),);
