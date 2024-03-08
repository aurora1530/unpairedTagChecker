#!/usr/bin/env node

import findUnpairedTags from './findUnpairedTags';
import { Tag } from './tag';
import fs from 'node:fs';
import { escapeComment, escaper } from './escape';

const filePaths = process.argv.slice(2);
filePaths.forEach((filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const escaped = escaper(data, [escapeComment]);
  const unpairedTags = findUnpairedTags(escaped);
  const formatted = Tag.formatMessage(unpairedTags, filePath);
  console.log(`target file: ${filePath}`);
  if (formatted.length === 0) {
    console.log('No unpaired tags found');
  } else {
    console.log(formatted);
  }
});
