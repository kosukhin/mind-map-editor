import { GuestObjectType, FactoryType, GuestAwareType } from 'patron-oop';
import { Keyboard } from '@/modules/integration/browser/keyboard/Keyboard';
import { debug } from 'debug';

const localDebug = debug('ControlCombo');

/**
 * Комбинация с клавишей ctrl
 */
export class ControlCombo {
  public constructor(
    private keyboard: Keyboard,
    private factories: {
      guest: FactoryType<GuestObjectType>;
      guestInTheMiddle: FactoryType<GuestObjectType>;
    },
  ) {}

  /**
   * Случилась комбинация ctrl + keyCode
   */
  public happened(keyCode: string, eventGuest: GuestObjectType<KeyboardEvent>) {
    this.keyboard.event(
      this.factories.guestInTheMiddle.create(eventGuest, (e: KeyboardEvent) => {
        localDebug('combo happened look for key', keyCode, 'received', e.code);
        if (e.ctrlKey && e.code === keyCode && e.type === 'keydown') {
          e.preventDefault();
          eventGuest.give(e);
        }
      }),
    );
  }

  /**
   * Случилась комбинация ctrl + keyCode с условием comboCondition
   */
  public happenedConditional(
    keyCode: string,
    comboCondition: GuestAwareType<boolean>,
    eventGuest: GuestObjectType<KeyboardEvent>,
  ) {
    localDebug('combo control happened registration');
    this.keyboard.event(
      this.factories.guestInTheMiddle.create(eventGuest, (e: KeyboardEvent) => {
        localDebug('keyboard event come');
        comboCondition.value(
          this.factories.guest.create((isHappenedPossible: boolean) => {
            localDebug('combo happened look for key', keyCode, 'received', e.code);
            if (isHappenedPossible && e.ctrlKey && e.code === keyCode && e.type === 'keydown') {
              e.preventDefault();
              eventGuest.give(e);
            }
          }),
        );
      }),
    );
  }
}
