export class Position {
  constructor(private readonly _rowIndex: number, private readonly _colIndex: number) {
    if (_rowIndex < 0 || _colIndex < 0) {
      throw new RangeError(
        `Index must be greater than 0. row: ${_rowIndex}, col: ${_colIndex}.`
      );
    }

    this._rowIndex = _rowIndex;
    this._colIndex = _colIndex;
  }

  private _isEqualsTo(position: Position): boolean {
    return this._rowIndex === position._rowIndex && this._colIndex === position._colIndex;
  }

  public isPreviousTo(position: Position): boolean {
    return (
      this._rowIndex < position._rowIndex ||
      (this._rowIndex === position._rowIndex && this._colIndex < position._colIndex)
    );
  }

  public isFollowingTo(position: Position): boolean {
    return !(this._isEqualsTo(position) || this.isPreviousTo(position));
  }

  public formatted(): string {
    return `${this._rowIndex + 1}:${this._colIndex + 1}`;
  }
}
