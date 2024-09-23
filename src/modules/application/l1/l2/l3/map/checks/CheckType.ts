import { GuestType } from '@/modules/system/guest/GuestType';

/**
 * Интерфейс проверки если вернул true - значит проверка прошла
 * если string - значит сообщение об ошибке
 */
export interface CheckType<T> {
  check(value: T, guest: GuestType<true | string>): this;
}
