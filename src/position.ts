export class Position {
  constructor(private readonly rowIndex: number, private readonly colIndex: number) {
    if (rowIndex < 0 || colIndex < 0) {
      throw new RangeError(
        `Index must be greater than 0. row: ${rowIndex}, col: ${colIndex}.`
      );
    }

    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
  }

  private _isEqualsTo(position: Position): boolean {
    return this.rowIndex === position.rowIndex && this.colIndex === position.colIndex;
  }

  public isPreviousTo(position: Position): boolean {
    return (
      this.rowIndex < position.rowIndex ||
      (this.rowIndex === position.rowIndex && this.colIndex < position.colIndex)
    );
  }

  public isFollowingTo(position: Position): boolean {
    return !(this._isEqualsTo(position) || this.isPreviousTo(position));
  }

  public formatted(): string {
    return `${this.rowIndex + 1}:${this.colIndex + 1}`;
  }
}
