export const escaper = (text: string, regexps: RegExp[]) => {
  return regexps.reduce(
    (acc, regexp) =>
      acc.replace(regexp, (match) => {
        return match.replace(/./g, 'x');
      }),
    text
  );
};

/**
 * must be in this order.
 *
 * comment must be escaped first.
 *
 * code block must be escaped before inline code.
 */
export const escapeRegexps = {
  comment: /<!--[\s\S]*?-->/g,
  codeblock: /^```[\s\S]*?^```/gm,
  inlineCode: /`[^`]+`/g,
};
