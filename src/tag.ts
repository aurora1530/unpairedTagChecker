import { Position } from './position';

type tagType = 'start' | 'end';

export class Tag {
  private static readonly _voidTags = [
    'area',
    'base',
    'br',
    'col',
    'command',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
  ];

  private static readonly _startTagRegExp = /<(?<name>[a-zA-Z]+?)\b[\s\S]*?>/g;
  private static readonly _endTagRegExp = /<\/(?<name>[a-zA-Z]+?)>/g;

  private readonly _name: string;
  public readonly type: tagType;
  private readonly _position: Position;
  public readonly isVoid: boolean;
  private constructor(name: string, type: tagType, position: Position) {
    this._name = name;
    this.type = type;
    this._position = position;
    this.isVoid = Tag._voidTags.includes(name);
  }

  public static fromText(text: string): Tag[] {
    const startTagMatches = text.matchAll(Tag._startTagRegExp);
    const endTagMatches = text.matchAll(Tag._endTagRegExp);

    const splittedText = text.split('');
    const parseMatches = (match: RegExpMatchArray, tagType: tagType) => {
      if (match.groups === undefined) {
        throw new Error('Invalid match. Match groups are not defined.');
      }
      if (match.index === undefined) {
        throw new Error('Invalid match. Match index is not defined.');
      }

      const name = match.groups.name;
      const index = match.index;
      const position = new Position(
        splittedText.slice(0, index).filter((char) => char === '\n').length,
        index - splittedText.slice(0, index).lastIndexOf('\n') - 1
      );

      return new Tag(name, tagType, position);
    };

    const startTags = [...startTagMatches].map((match) => parseMatches(match, 'start'));
    const endTags = [...endTagMatches].map((match) => parseMatches(match, 'end'));
    return Tag.toSorted([...startTags, ...endTags]);
  }

  public static toSorted(tags: Tag[]): Tag[] {
    return tags.toSorted((a, b) => (a._position.isPreviousTo(b._position) ? -1 : 1));
  }

  public isSameTagName(tag: Tag): boolean {
    return this._name === tag._name;
  }

  public static formatMessage(unpairedTags: Tag[], filePath?: string): string {
    return unpairedTags
      .map((tag) => {
        const missing = tag.type === 'start' ? 'end' : 'start';
        const at = (filePath ? `${filePath}:` : ``) + tag._position.formatted();
        return `Missing ${missing} tag for ${tag._name} tag\n  at ${at}`;
      })
      .join('\n');
  }
}
