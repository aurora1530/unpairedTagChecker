export const escaper = (text: string, regexps: RegExp[]) => {
  return regexps.reduce(
    (acc, regexp) =>
      acc.replace(regexp, (match) => {
        return match.replace(/./g, 'x');
      }),
    text
  );
};

export const escapeComment = /<!--[\s\S]*?-->/g;

export const escapeCodeblock = /^```[\s\S]*?^```/gm;

export const escapeInlineCode = /`[^`]+`/g;
