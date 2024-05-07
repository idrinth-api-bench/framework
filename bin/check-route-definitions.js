#!/usr/bin/env node
import checkRoutes from '../src/cli/check-routes.ts';

checkRoutes(process.argv, process.cwd(),);
