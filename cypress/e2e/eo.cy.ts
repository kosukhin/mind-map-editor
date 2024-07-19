import { OptionalSync } from '@/modules/eo/v2/system/OptionalSync';
import { OptionalAsync } from '@/modules/eo/v2/system/OptionalAsync';

const timeout = (delay: number, result: string) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(result);
  }, delay);
});

describe('EO', () => {
  it('Проверить вложенность Optional', () => {
    const obj = new OptionalSync(
      new OptionalSync(
        new OptionalSync(
          new OptionalSync(
            new OptionalSync('unwrapped'),
          ),
        ),
      ),
    );
    obj.filled((value) => {
      console.log('sync result', value);
      expect(value).to.eq('unwrapped');
    });
  });

  it('Проверить вложенность async optional', () => {
    const obj = new OptionalAsync(timeout(1000, 'one-').then((result) => new OptionalAsync(timeout(2000, `${result}two`))));
    obj.filled((value) => {
      console.log('async result', value);
      expect(value).to.eq('one-two');
    });
  });
});
