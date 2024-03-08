import { escapeCodeblock, escapeComment, escapeInlineCode, escaper } from '../src/escape';
import fs from 'node:fs';
import path from 'node:path';

const escapeType = ['comment', 'codeblock', 'inlineCode', 'all'] as const;

const targetEscaper = (type: (typeof escapeType)[number]) => {
  return (text: string) => {
    switch (type) {
      case 'comment':
        return escaper(text, [escapeComment]);
      case 'codeblock':
        return escaper(text, [escapeCodeblock]);
      case 'inlineCode':
        return escaper(text, [escapeInlineCode]);
      case 'all':
        // must be in this order
        // comment must be escaped first
        // code block must be escaped before inline code
        return escaper(text, [escapeComment, escapeCodeblock, escapeInlineCode]);
    }
  };
};

const readTestMd = (
  type: (typeof escapeType)[number],
  purpose: 'test' | 'expected'
): string => {
  if (type === 'all') {
    return escapeType
      .filter((t) => t !== 'all')
      .map((t) => readTestMd(t, purpose))
      .join('\n');
  } else {
    return fs.readFileSync(
      path.join(__dirname, `./escape/${type}.${purpose}.md`),
      'utf8'
    );
  }
};

const escapeTest = (type: (typeof escapeType)[number]) => {
  return () => {
    const text = readTestMd(type, 'test');

    const escapedText = targetEscaper(type)(text);
    const expectedText = readTestMd(type, 'expected');

    expect(escapedText).toBe(expectedText);
  };
};

describe('escape test', () => {
  it('should escape comments', () => {
    escapeTest('comment')();
  });

  it('should escape codeblocks', () => {
    escapeTest('codeblock')();
  });

  it('should escape inline code', () => {
    escapeTest('inlineCode')();
  });

  it('should escape all', () => {
    escapeTest('all')();
  });
});
