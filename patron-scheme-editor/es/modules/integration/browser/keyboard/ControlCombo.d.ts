import { GuestObjectType, FactoryType, GuestAwareType } from 'patron-oop';
import { Keyboard } from './Keyboard';
/**
 * Комбинация с клавишей ctrl
 */
export declare class ControlCombo {
    private keyboard;
    private factories;
    constructor(keyboard: Keyboard, factories: {
        guest: FactoryType<GuestObjectType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    /**
     * Случилась комбинация ctrl + keyCode
     */
    happened(keyCode: string, eventGuest: GuestObjectType<KeyboardEvent>): void;
    /**
     * Случилась комбинация ctrl + keyCode с условием comboCondition
     */
    happenedConditional(keyCode: string, comboCondition: GuestAwareType<boolean>, eventGuest: GuestObjectType<KeyboardEvent>): void;
}
