#!/usr/bin/env node

import findUnpairedTags from './findUnpairedTags';
import format from './format';
import fs from 'node:fs';
import { escapeComment } from 'escape';

const filePaths = process.argv.slice(2);
filePaths.forEach((filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const escaped = escapeComment(data);
  const unpairedTags = findUnpairedTags(escaped);
  const formatted = format(unpairedTags, filePath);
  console.log(`target file: ${filePath}`);
  if (formatted.length === 0) {
    console.log('No unpaired tags found');
  } else {
    console.log(formatted);
  }
});
