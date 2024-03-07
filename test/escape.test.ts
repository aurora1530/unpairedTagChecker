import { escapeComment } from '../src/escape';

describe('escapeComment', () => {
  it('should escape comments', () => {
    const text = `<div><!-- comment 1 --></div>`;
    const escapedText = escapeComment(text);
    expect(escapedText).toBe('<div>                  </div>');
  });
});
