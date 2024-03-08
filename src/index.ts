#!/usr/bin/env node

import findUnpairedTags from './findUnpairedTags';
import { Tag } from './tag';
import fs from 'node:fs';
import path from 'node:path';
import { escapeRegexps, escaper } from './escape';

const fileTypeToEscapes = (fileType: string) => {
  if (fileType.match(/md/i) || fileType.match(/markdown/i)) {
    return Object.values(escapeRegexps);
  } else {
    return [escapeRegexps.comment];
  }
};

const filePaths = process.argv.slice(2);
filePaths.forEach((filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const fileType = path.extname(filePath).slice(1);
  const escapes = fileTypeToEscapes(fileType);
  const escaped = escaper(data, escapes);
  const unpairedTags = findUnpairedTags(escaped);
  const formatted = Tag.formatMessage(unpairedTags, filePath);
  console.log(`target file: ${filePath}`);
  if (formatted.length === 0) {
    console.log('No unpaired tags found');
  } else {
    console.log(formatted);
  }
});
