// Nesh REPL bootstrap script
// Usage:
// npm i -g nesh
// nesh
// > .load repl.js

const data = require('./etc/project-sets.json');
const ProjectSet = require('./lib/project-set');
const Project = require('./lib/project');
const { Interval, DateTime } = require('luxon');
