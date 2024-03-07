import { Tag } from './tag';

export default (text: string): Tag[] => {
  const tags = Tag.fromText(text);

  const startTagStack: Record<string, Tag[]> = {};

  const unpairedTags: Tag[] = [];

  tags
    .filter((tag) => !tag.isVoid)
    .forEach((tag) => {
      const { name, type } = tag;
      if (!(name in startTagStack)) {
        startTagStack[name] = [];
      }

      if (type === 'start') {
        startTagStack[name].push(tag);
      } else {
        const pair = startTagStack[name].pop();
        if (pair === undefined) {
          unpairedTags.push(tag);
        }
      }
    });

  return Tag.toSorted([...unpairedTags, ...Object.values(startTagStack).flat()]);
};
