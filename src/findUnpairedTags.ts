import { Tag } from './tag';

export default (text: string): Tag[] => {
  const tags = Tag.fromText(text);

  const startTagStack: Tag[] = [];

  const unpairedTags: Tag[] = [];

  tags
    .filter((tag) => !tag.isVoid)
    .forEach((tag) => {
      const { name, type } = tag;

      if (type === 'start') {
        startTagStack.push(tag);
      } else {
        if (startTagStack.at(-1)?.name !== name) {
          unpairedTags.push(tag);
          return;
        }

        const pair = startTagStack.pop();
        if (pair === undefined) {
          unpairedTags.push(tag);
        }
      }
    });

  return Tag.toSorted([...unpairedTags, ...Object.values(startTagStack).flat()]);
};
