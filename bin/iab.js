#!/usr/bin/env node
import cli from '../src/cli/cli.ts';

process.exit(await cli(process.argv, process.cwd(),),);
