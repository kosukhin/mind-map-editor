import { GuestObjectType } from 'patron-oop';

/**
 * Интерфейс проверки если вернул true - значит проверка прошла
 * если string - значит сообщение об ошибке
 */
export interface CheckType<T> {
  check(value: T, guest: GuestObjectType<true | string>): this;
}
