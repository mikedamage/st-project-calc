#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ProjectSet = require('../lib/project-set');

const input = process.argv[2] || path.resolve(__dirname, '../etc/project-sets.json');

fs.readFile(input, 'utf8', (err, data) => {
  if (err) return console.error(err);

  const projectSets = JSON.parse(data).map((set) => new ProjectSet(set));

  for (const [ idx, projectSet ] of projectSets.entries()) {
    console.log(chalk.bold(`Project Set ${idx + 1}: `) + '$' + chalk.green(projectSet.totalReimbursement()));
  }
});
