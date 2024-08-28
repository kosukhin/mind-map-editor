import { expect, test } from 'vitest';
import { FakeSource } from '@/modules/system/fake/FakeSource';
import { GuestChain } from '@/modules/system/guest/GuestChain';
import { Patron } from '@/modules/system/guest/Patron';
import { Visitant } from './Visitant';

test('chain guest returns 2 values after result guest', () => {
  const one = new FakeSource(1);
  const two = new FakeSource(2);
  const chain = new GuestChain<any>();

  chain.result(new Visitant((value) => {
    expect(Object.values(value).join()).toBe('1,2');
  }));

  one.data(chain.receiveKey('one'));
  two.data(chain.receiveKey('two'));
});

test('chain guest returns 2 values before result guest', () => {
  const one = new FakeSource(1);
  const two = new FakeSource(2);
  const chain = new GuestChain<any>();

  one.data(chain.receiveKey('one'));
  two.data(chain.receiveKey('two'));

  chain.result(new Visitant((value) => {
    expect(Object.values(value).join()).toBe('1,2');
  }));
});

test('chain with patron', () => {
  const one = new FakeSource(1);
  const two = new FakeSource(2);
  const chain = new GuestChain<any>();

  one.data(new Patron(chain.receiveKey('one')));
  two.data(new Patron(chain.receiveKey('two')));

  one.receive(3);
  one.receive(4);

  chain.result(new Patron(new Visitant((value) => {
    expect(Object.values(value).length).toBe(2);
  })));
});
