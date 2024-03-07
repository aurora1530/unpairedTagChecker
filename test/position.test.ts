import { Position } from '../src/position';

describe('Position Class Test', () => {
  it('should throw an error if the row or col index is less than 0', () => {
    expect(() => new Position(-1, 0)).toThrow(RangeError);
    expect(() => new Position(0, -1)).toThrow(RangeError);
  });

  it('should return true if the position is previous to the given position', () => {
    const position = new Position(0, 0);
    expect(position.isPreviousTo(new Position(0, 1))).toBe(true);
    expect(position.isPreviousTo(new Position(1, 0))).toBe(true);
  });

  it('should return false if the position is previous to the given position', () => {
    const position = new Position(1, 0);
    expect(position.isPreviousTo(new Position(1, 0))).toBe(false);
    expect(position.isPreviousTo(new Position(0, 1))).toBe(false);
  });

  it('should return true if the position is following to the given position', () => {
    const position = new Position(1, 1);
    expect(position.isFollowingTo(new Position(0, 1))).toBe(true);
    expect(position.isFollowingTo(new Position(1, 0))).toBe(true);
  });

  it('should return false if the position is following to the given position', () => {
    const position = new Position(0, 0);
    expect(position.isFollowingTo(new Position(0, 0))).toBe(false);
    expect(position.isFollowingTo(new Position(1, 0))).toBe(false);
  });
});
