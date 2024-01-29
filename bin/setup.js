#!/usr/bin/env node

'use strict';

import chalk from 'chalk';

import { createInterface } from 'readline';
import { mkdir } from 'node:fs/promises';
import {
  existsSync,
  statSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync
} from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
// import { execSync } from 'child_process';

const promptMark = chalk.cyan;

const error = chalk.red;

const success = chalk.green.bold;
const info = chalk.cyan.italic;

const logInfo = message => console.log(info(message));
const logError = message => console.log(error(message));
const logSuccess = message => console.log(success(message));

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

rl.on('SIGINT', () => {
  rl.question('Are you sure you want to exit? (y/n) ', answer => {
    if (answer.match(/^y(es)?$/i)) rl.close();
  });
});

main();

async function main() {
  try {
    const projectName = await getProjectName();

    if (projectName) {
      process.stdout.moveCursor(0, -1);
      process.stdout.clearLine();
      rl.write(`${promptMark('')} project name: ${success(projectName)} \n`);
    }

    const dirPath = `${process.cwd()}/${projectName}`;
    const templatePath = getTemplatePath();

    // create project directory
    logInfo(` creating ${projectName} directory...`);
    await mkdir(dirPath);

    logInfo(` creating ${projectName} files...`);
    createDirectoryContents(templatePath, projectName);

    logSuccess(` ${projectName} created successfully!`);

    // await initGit(dirPath);
    // await installDependencies(dirPath);

    rl.close();
  } catch (e) {
    logError(e);
    process.exit(1);
  }
}

// function installDependencies(dirPath) {
//   return new Promise((resolve, reject) => {
//     rl.question("Do you want to install dependencies? (y/n) ", (answer) => {
//       if (answer === "y") {
//         logInfo(` installing dependencies...`);
//         process.chdir(dirPath);
//         execSync("npm install");
//         logSuccess(` dependencies installed successfully!`);
//       }
//     });
//   });
// }
//
// function initGit(dirPath) {
//   return new Promise((resolve, reject) => {
//     rl.question("Do you want to initialize git ? (y/n) ", (answer) => {
//       if (answer === "y") {
//         process.chdir(dirPath);
//         execSync("git init");
//         logSuccess(` git initialized`);
//         resolve();
//       }
//     });
//   });
// }

function createDirectoryContents(templatePath, projectName) {
  const SKIP_FILES = [
    '.git',
    'dist',
    'build',
    'node_modules',
    'yarn.lock',
    'pnpm-lock.yaml',
    'package-lock.json'
  ];

  const CURR_DIR = process.cwd();

  const filesToCreate = readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = path.join(templatePath, file);

    // get stats about the current file
    const stats = statSync(origFilePath);

    // skip files that should not be copied
    if (SKIP_FILES.indexOf(file) > -1) return;

    if (stats.isFile()) {
      // read file content and transform it using template engine
      let contents = readFileSync(origFilePath, 'utf8');
      // write file to destination folder
      const writePath = path.join(CURR_DIR, projectName, file);
      writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      // create folder in destination folder
      mkdirSync(path.join(CURR_DIR, projectName, file));
      // copy files/folder inside current folder recursively
      createDirectoryContents(
        path.join(templatePath, file),
        path.join(projectName, file)
      );
    }
  });
}

function getTemplatePath() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const templatePath = path.join(__dirname, '../', 'template');

  return templatePath;
}

function getProjectName() {
  return new Promise((resolve, reject) => {
    rl.question(`${promptMark('')} project name: `, async name => {
      if (existsSync(name)) {
        reject('Project already exists');
      }

      resolve(name);
    });
  });
}
