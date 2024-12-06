import { GuestObjectType } from 'patron-oop';

function toBase64(instr: string) {
  const binAry = (new TextEncoder().encode(instr));
  const safeStr = String.fromCharCode(...binAry);
  return btoa(safeStr);
}

function fromBase64(binstr: string) {
  const safeStr = atob(binstr);
  const arr = new Uint8Array(safeStr.length);
  for (let i = 0; i < safeStr.length; i += 1) {
    arr[i] = safeStr.charCodeAt(i);
  }
  return new TextDecoder().decode(arr);
}

export class HtmlTemplate {
  private regexp = /(?:window\.|const\s)content = '(.+)'/;

  private varTemplate = "window.content = '{json}'";

  public constructor(private htmlTemplate: string) { }

  public htmlToJson(html: string, jsonGuest: GuestObjectType<string>) {
    const matches = html.match(this.regexp);
    if (matches?.[1]) {
      if (matches[1][0] === '{') {
        jsonGuest.give(matches[1].replaceAll('\\\\"', '\\"'));
      } else {
        jsonGuest.give(fromBase64(matches[1] as string));
      }
    } else {
      this.htmlToJson(this.htmlTemplate, jsonGuest);
    }
    return this;
  }

  public jsonToHtml(json: string, htmlGuest: GuestObjectType<string>) {
    const varTemplate = this.varTemplate.replace('{json}', toBase64(json));
    const realHtml = this.htmlTemplate.replace(this.regexp, varTemplate);
    htmlGuest.give(realHtml);
    return this;
  }
}
