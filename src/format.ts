import { Tag } from './tag';

export default (unpairedTags: Tag[], filePath?: string): string => {
  return unpairedTags
    .map((tag) => {
      const missing = tag.type === 'start' ? 'end' : 'start';
      const at =
        (filePath ? `${filePath}:` : ``) +
        `${tag.position.rowIndex + 1}:${tag.position.colIndex + 1}`;
      return `Missing ${missing} tag for ${tag.name} tag\n  at ${at}`;
    })
    .join('\n');
};
