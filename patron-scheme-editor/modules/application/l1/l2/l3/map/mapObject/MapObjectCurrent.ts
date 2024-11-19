import {
  MapObjectCurrentType,
} from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectCurrentType';
import debug from 'debug';
import { GuestObjectType, FactoryType, SourceType } from 'patron-oop';

const localDebug = debug('app:MapObjectCurrent');

/**
 * Представление текущего выбранного объекта с логикой
 * бронирования выбранного объекта одним гостем
 */
export class MapObjectCurrent implements MapObjectCurrentType {
  private idCache: SourceType<string>;

  private silenceActivator: SourceType<GuestObjectType<string> | false>;

  public constructor(
    private drawer: GuestObjectType<string>,
    private factories: {
      sourceEmpty: FactoryType<SourceType>,
      source: FactoryType<SourceType>,
      patron: FactoryType<GuestObjectType>,
      guest: FactoryType<GuestObjectType>
    },
  ) {
    this.idCache = factories.sourceEmpty.create();
    this.silenceActivator = factories.source.create(false);
    this.idCache.value(
      factories.patron.create(
        factories.guest.create((value: string) => {
          if (value) {
            drawer.give('object');
          }
        }),
      ),
    );
  }

  public silenceOn(activator: GuestObjectType<string>) {
    this.silenceActivator.give(activator);
    return this;
  }

  public silenceOff() {
    this.silenceActivator.give(false);
    return this;
  }

  public objectId<R extends GuestObjectType<string>>(guest: R) {
    this.idCache.value(guest);
    return guest;
  }

  public give(value: string): this {
    localDebug('new value current object', value);
    this.silenceActivator.value(
      this.factories.guest.create((activator: GuestObjectType<string> | false) => {
        localDebug('silence activator', activator);
        // Если мы в режиме тишины то значение получает только тот кто активировал тишину
        if (activator) {
          activator.give(value);
        } else {
          this.idCache.give(value);
        }
      }),
    );
    return this;
  }
}
