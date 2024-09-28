import { GuestType } from '@/modules/system/guest/GuestType';
import { Keyboard } from '@/modules/integration/browser/keyboard/Keyboard';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';
import { debug } from 'debug';

const localDebug = debug('ControlCombo');

export class ControlCombo {
  public constructor(
    private keyboard: Keyboard,
    private factories: {
      guest: FactoryType<GuestType>,
      guestInTheMiddle: FactoryType<GuestType>,
    },
  ) {}

  happened(
    keyCode: string,
    comboCondition: GuestAwareType<boolean>,
    eventGuest: GuestType<KeyboardEvent>,
  ) {
    localDebug('combo control happened registration');
    this.keyboard.event(
      this.factories.guestInTheMiddle.create(eventGuest, (e: KeyboardEvent) => {
        localDebug('keyboard event come');
        comboCondition.receiving(
          this.factories.guest.create((isHappenedPossible: boolean) => {
            localDebug('combo happened look for key', keyCode, 'received', e.code);
            if (isHappenedPossible && e.ctrlKey && e.code === keyCode && e.type === 'keydown') {
              e.preventDefault();
              eventGuest.receive(e);
            }
          }),
        );
      }),
    );
  }
}
