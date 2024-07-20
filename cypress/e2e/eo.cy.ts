import { OptionalSync } from '@/modules/eo/v2/system/OptionalSync';
import { OptionalAsync } from '@/modules/eo/v2/system/OptionalAsync';

const timeout = (delay: number, result: string | null) => new Promise((resolve) => {
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
      return value;
    }).empty(() => {
      console.log('PROMBLEM!!! async is empty');
    });
  });

  it('То что возвращается методами empty filled оборачивается в новый Optional', () => {
    new OptionalAsync(timeout(500, null)).empty(
      () => new OptionalAsync(timeout(500, '222333')),
    ).filled((value) => {
      console.log('filled', value);
    });
  });

  it('Несколько filled обработчиков асинхронно', () => {
    new OptionalAsync(timeout(500, 'many filled async'))
      .filled((value) => {
        console.log('filled1 async', value);
        return value;
      })
      .filled((value) => {
        console.log('filled2 async', value);
        return value;
      })
      .filled((value) => {
        console.log('filled3 async', value);
        return value;
      });
  });

  it('Несколько filled обработчиков синхронно', () => {
    new OptionalSync('many filled sync')
      .filled((value) => {
        console.log('filled1 sync', value);
        return value;
      })
      .filled((value) => {
        console.log('filled2 sync', value);
        return '1111';
      })
      .filled((value) => {
        console.log('filled3 sync', value);
        return value;
      });
  });
});
