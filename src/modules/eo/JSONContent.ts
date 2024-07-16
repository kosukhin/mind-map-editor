export class JSONContent {
  public constructor(private content: string | object) {}

  public string() {
    if (typeof this.content !== 'object') {
      throw new Error('JSON: content must be object for stringify!');
    }
    return JSON.stringify(this.content);
  }

  public parse() {
    if (typeof this.content !== 'string') {
      throw new Error('JSON: content must be string for parse!');
    }
    return JSON.parse(this.content);
  }
}
