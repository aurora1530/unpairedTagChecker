import { Tag } from './tag';

export default (unpairedTags: Tag[], filePath?: string): string => {
  return unpairedTags
    .map((tag) => {
      const missing = tag.type === 'start' ? 'end' : 'start';
      const at = (filePath ? `${filePath}:` : ``) + tag.position.formatted();
      return `Missing ${missing} tag for ${tag.name} tag\n  at ${at}`;
    })
    .join('\n');
};
