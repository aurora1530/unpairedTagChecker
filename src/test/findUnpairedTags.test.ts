import { Position } from '../position';
import findUnpairedTags from '../findUnpairedTags';

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

    const text2 = `<div>
<div>
<span>
</div>
</span>
</div>`;
    const unpairedTags2 = findUnpairedTags(text2);
    expect(unpairedTags2.length).toBe(2);
    expect(unpairedTags2).toEqual([
      expect.objectContaining({
        name: 'div',
        type: 'start',
        position: new Position(0, 0),
      }),
      expect.objectContaining({
        name: 'div',
        type: 'end',
        position: new Position(3, 0),
      }),
    ]);
  });
});
