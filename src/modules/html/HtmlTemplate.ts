import { GuestObjectType } from 'patron-oop';

export class HtmlTemplate {
  private regexp = /(?:window\.|const\s)content = '(.+)'/;

  private varTemplate = "window.content = '{json}'";

  public constructor(private htmlTemplate: string) { }

  public htmlToJson(html: string, jsonGuest: GuestObjectType<string>) {
    const matches = html.match(this.regexp);
    if (matches?.[1]) {
      jsonGuest.give(matches[1].replaceAll('\\\\"', '\\"'));
    } else {
      this.htmlToJson(this.htmlTemplate, jsonGuest);
    }
    return this;
  }

  public jsonToHtml(json: string, htmlGuest: GuestObjectType<string>) {
    const varTemplate = this.varTemplate.replace('{json}', json.replaceAll('\\"', '\\\\"'));
    const realHtml = this.htmlTemplate.replace(this.regexp, varTemplate);
    htmlGuest.give(realHtml);
    return this;
  }
}
