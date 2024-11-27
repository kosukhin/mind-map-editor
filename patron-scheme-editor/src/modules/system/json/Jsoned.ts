import { give, GuestCast, GuestType, PatronPool, SourceType } from 'patron-oop';

export class Jsoned implements SourceType<string> {
  public constructor(private baseSource: SourceType) {}

  public value(guest: GuestType<string>) {
    this.baseSource.value(
      new GuestCast(<GuestType>guest, (value) => {
        give(JSON.stringify(value), guest);
      }),
    );
    return this;
  }

  public give(newValue: string): this {
    this.value((latestValue) => {
      if (newValue !== latestValue) {
        this.baseSource.give(JSON.parse(newValue));
      }
    });
    return this;
  }

  public pool(): PatronPool<string> {
    return this.baseSource.pool();
  }
}
