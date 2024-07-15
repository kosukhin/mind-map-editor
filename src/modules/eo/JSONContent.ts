export class JSONContent {
  constructor(private content: string | object) {}

  string() {
    if (typeof this.content !== 'object') {
      throw new Error('JSON: content must be object for stringify!');
    }
    return JSON.stringify(this.content);
  }

  parse() {
    if (typeof this.content !== 'string') {
      throw new Error('JSON: content must be string for parse!');
    }
    return JSON.parse(this.content);
  }
}
