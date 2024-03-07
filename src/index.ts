#!/usr/bin/env node

import findUnpairedTags from './findUnpairedTags';
import format from './format';
import fs from 'node:fs';

const filePaths = process.argv.slice(2);
filePaths.forEach((filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const unpairedTags = findUnpairedTags(data);
  const formatted = format(unpairedTags, filePath);
  console.log(`target file: ${filePath}`);
  if (formatted.length === 0) {
    console.log('No unpaired tags found');
  } else {
    console.log(formatted);
  }
});
