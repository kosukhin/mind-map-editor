import { GuestObjectType } from 'patron-oop';

export class HtmlTemplate {
  private regexp = /const content = '(.+)'/;

  private varTemplate = "const content = '{json}'";

  public constructor(private htmlTemplate: string) { }

  public htmlToJson(html: string, jsonGuest: GuestObjectType<string>) {
    const matches = html.match(this.regexp);
    if (matches?.[1]) {
      jsonGuest.give(matches[1]);
    } else {
      this.htmlToJson(this.htmlTemplate, jsonGuest);
    }
    return this;
  }

  public jsonToHtml(json: string, htmlGuest: GuestObjectType<string>) {
    const varTemplate = this.varTemplate.replace('{json}', json);
    const realHtml = this.htmlTemplate.replace(this.regexp, varTemplate);
    htmlGuest.give(realHtml);
    return this;
  }
}
