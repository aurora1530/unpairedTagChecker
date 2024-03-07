import { Position } from '../src/position';
import findUnpairedTags from '../src/findUnpairedTags';

describe('findUnpairedTags', () => {
  it('should find unpaired tags', () => {
    const text = `<div></div>
<span>
</div><div>`;
    const unpairedTags = findUnpairedTags(text);
    expect(unpairedTags.length).toBe(3);
    expect(unpairedTags).toEqual([
      expect.objectContaining({
        name: 'span',
        type: 'start',
        position: new Position(1, 0),
      }),
      expect.objectContaining({
        name: 'div',
        type: 'end',
        position: new Position(2, 0),
      }),
      expect.objectContaining({
        name: 'div',
        type: 'start',
        position: new Position(2, 6),
      }),
    ]);
  });
});
