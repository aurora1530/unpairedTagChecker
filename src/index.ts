import findUnpairedTags from './findUnpairedTags';
import format from './format';
import { program } from 'commander';
import fs from 'node:fs';

program
  .command('file <filePath>')
  .description('Find unpaired tags in a file')
  .action((filePath) => {
    const data = fs.readFileSync(filePath, 'utf8');
    const unpairedTags = findUnpairedTags(data);
    console.log(format(unpairedTags, filePath));
  });

program.parse();
