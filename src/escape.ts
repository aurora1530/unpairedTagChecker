export const escapeComment = (text: string): string => {
  const regex = /<!--[\s\S]*?-->/g;
  return text.replace(regex, (match) => {
    return ' '.repeat(match.length);
  });
};
