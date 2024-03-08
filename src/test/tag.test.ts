import { Tag } from '../tag';
import { Position } from '../position';
describe('Tag Class Test', () => {
  it('should create tags from text', () => {
    const text1 = `<div>
<span></span>
</div>
<img src="test.png" alt="test" />`;
    const tags1 = Tag.fromText(text1);

    expect(tags1.length).toBe(5);
    expect(tags1[0]).toEqual(
      expect.objectContaining({
        name: 'div',
        type: 'start',
        position: new Position(0, 0),
        isVoid: false,
      })
    );
    expect(tags1[1]).toEqual(
      expect.objectContaining({
        name: 'span',
        type: 'start',
        position: new Position(1, 0),
        isVoid: false,
      })
    );
    expect(tags1[2]).toEqual(
      expect.objectContaining({
        name: 'span',
        type: 'end',
        position: new Position(1, 6),
        isVoid: false,
      })
    );
    expect(tags1[3]).toEqual(
      expect.objectContaining({
        name: 'div',
        type: 'end',
        position: new Position(2, 0),
        isVoid: false,
      })
    );
    expect(tags1[4]).toEqual(
      expect.objectContaining({
        name: 'img',
        type: 'start',
        position: new Position(3, 0),
        isVoid: true,
      })
    );
  });
});
