import { Subscriber } from '../interfaces/mediator.interface';
import StickyNoteMediator from './sticky-note-mediator';

const mock1 = jest.fn();
const mock2 = jest.fn();

const notifyObj1: Subscriber = {
  callback: mock1,
  thisRef: {},
};
const notifyObj2: Subscriber = {
  callback: mock2,
  thisRef: {},
};

describe('subscribe', () => {
  let mediator: StickyNoteMediator;
  beforeEach(() => {
    mediator = new StickyNoteMediator();
  });

  test('should create event if event does not exist', () => {
    mediator.subscribe('exampleEvent', notifyObj1);
    const subscribedFunctions = mediator.getEvents().exampleEvent;
    expect(subscribedFunctions).toBeDefined();
  });

  test('should subscribe given function to given event', () => {
    mediator.subscribe('exampleEvent', notifyObj1);
    const subscribedFunctions = mediator.getEvents().exampleEvent;
    expect(subscribedFunctions).toContain(notifyObj1);
  });

  test('should not subscribe given function if it is already subscribed to given event', () => {
    mediator.subscribe('exampleEvent', notifyObj1);
    mediator.subscribe('exampleEvent', notifyObj1);
    const subscribedFunctions = mediator.getEvents().exampleEvent;
    expect(subscribedFunctions.length).toBe(1);
  });

  test('should have two subscribed functions', () => {
    mediator.subscribe('exampleEvent', notifyObj1);
    mediator.subscribe('exampleEvent', notifyObj2);
    const subscribedFunctions = mediator.getEvents().exampleEvent;
    expect(subscribedFunctions.length).toBe(2);
  });

  test('should subscribe the same function to two different events', () => {
    mediator.subscribe('exampleEvent', notifyObj1);
    mediator.subscribe('exampleEvent2', notifyObj1);
    const subscribedFunctionsToEventOne = mediator.getEvents().exampleEvent;
    const subscribedFunctionsToEventTwo = mediator.getEvents().exampleEvent2;
    expect(subscribedFunctionsToEventOne.length).toBe(1);
    expect(subscribedFunctionsToEventTwo.length).toBe(1);
  });
});

describe('unsubscribe', () => {
  let mediator: StickyNoteMediator;
  beforeEach(() => {
    mediator = new StickyNoteMediator();
    mediator.subscribe('exampleEvent', notifyObj1);
    mediator.subscribe('exampleEvent', notifyObj2);
    mediator.subscribe('exampleEvent2', notifyObj1);
    mediator.subscribe('exampleEvent2', notifyObj2);
  });

  test('should unsubscribe given function from given event', () => {
    mediator.unsubscribe('exampleEvent', notifyObj1);
    const subscribedFunctions = mediator.getEvents().exampleEvent;
    expect(subscribedFunctions.length).toBe(1);
    expect(subscribedFunctions).not.toContain(notifyObj1);
    expect(subscribedFunctions).toContain(notifyObj2);
  });

  test('should do nothing if function is not subscribed', () => {
    mediator.unsubscribe('exampleEvent', notifyObj1);
    mediator.unsubscribe('exampleEvent', notifyObj1);
    const subscribedFunctions = mediator.getEvents().exampleEvent;
    expect(subscribedFunctions.length).toBe(1);
    expect(subscribedFunctions).not.toContain(notifyObj1);
    expect(subscribedFunctions).toContain(notifyObj2);
  });

  test('should unsubscribe given function only from given event', () => {
    mediator.unsubscribe('exampleEvent', notifyObj1);
    const subscribedFunctionsFromEventOne = mediator.getEvents().exampleEvent;
    const subscribedFunctionsFromEventTwo = mediator.getEvents().exampleEvent2;
    expect(subscribedFunctionsFromEventOne).not.toContain(notifyObj1);
    expect(subscribedFunctionsFromEventTwo).toContain(notifyObj1);
  });
});

describe('notify', () => {
  let mediator: StickyNoteMediator;
  beforeEach(() => {
    mediator = new StickyNoteMediator();
    mediator.subscribe('exampleEvent', notifyObj1);
    mediator.subscribe('exampleEvent', notifyObj2);
  });
  test('should call subscribed functions', () => {
    mediator.notify('exampleEvent', { value: undefined });
    expect(mock1).toBeCalledTimes(1);
    expect(mock2).toBeCalledTimes(1);
  });
  test('should call subscribed functions with given data', () => {
    const testedData = { value: 'test value' };
    mediator.notify('exampleEvent', testedData);
    expect(mock1).toBeCalledWith(testedData.value);
    expect(mock2).toBeCalledWith(testedData.value);
  });
});
