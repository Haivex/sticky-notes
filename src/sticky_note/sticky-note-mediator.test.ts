import StickyNoteMediator from './sticky-note-mediator';

const mock1 = jest.fn();
const mock2 = jest.fn();

describe('subscribe', () => {
  let mediator: StickyNoteMediator;
  beforeEach(() => {
    mediator = new StickyNoteMediator();
  });

  test('should create event if event does not exist', () => {
    mediator.subscribe('exampleEvent', mock1);
    const subscribedFunctions = mediator.getEvents().exampleEvent;
    expect(subscribedFunctions).toBeDefined();
  });

  test('should subscribe given function to given event', () => {
    mediator.subscribe('exampleEvent', mock1);
    const subscribedFunctions = mediator.getEvents().exampleEvent;
    expect(subscribedFunctions).toContain(mock1);
  });

  test('should not subscribe given function if it is already subscribed to given event', () => {
    mediator.subscribe('exampleEvent', mock1);
    mediator.subscribe('exampleEvent', mock1);
    const subscribedFunctions = mediator.getEvents().exampleEvent;
    expect(subscribedFunctions.length).toBe(1);
  });

  test('should have two subscribed functions', () => {
    mediator.subscribe('exampleEvent', mock1);
    mediator.subscribe('exampleEvent', mock2);
    const subscribedFunctions = mediator.getEvents().exampleEvent;
    expect(subscribedFunctions.length).toBe(2);
  });

  test('should subscribe the same function to two different events', () => {
    mediator.subscribe('exampleEvent', mock1);
    mediator.subscribe('exampleEvent2', mock1);
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
    mediator.subscribe('exampleEvent', mock1);
    mediator.subscribe('exampleEvent', mock2);
    mediator.subscribe('exampleEvent2', mock1);
    mediator.subscribe('exampleEvent2', mock2);
  });

  test('should unsubscribe given function from given event', () => {
    mediator.unsubscribe('exampleEvent', mock1);
    const subscribedFunctions = mediator.getEvents().exampleEvent;
    expect(subscribedFunctions.length).toBe(1);
    expect(subscribedFunctions).not.toContain(mock1);
    expect(subscribedFunctions).toContain(mock2);
  });

  test('should do nothing if function is not subscribed', () => {
    mediator.unsubscribe('exampleEvent', mock1);
    mediator.unsubscribe('exampleEvent', mock1);
    const subscribedFunctions = mediator.getEvents().exampleEvent;
    expect(subscribedFunctions.length).toBe(1);
    expect(subscribedFunctions).not.toContain(mock1);
    expect(subscribedFunctions).toContain(mock2);
  });

  test('should unsubscribe given function only from given event', () => {
    mediator.unsubscribe('exampleEvent', mock1);
    const subscribedFunctionsFromEventOne = mediator.getEvents().exampleEvent;
    const subscribedFunctionsFromEventTwo = mediator.getEvents().exampleEvent2;
    expect(subscribedFunctionsFromEventOne).not.toContain(mock1);
    expect(subscribedFunctionsFromEventTwo).toContain(mock1);
  });
});

describe('notify', () => {
  let mediator: StickyNoteMediator;
  beforeEach(() => {
    mediator = new StickyNoteMediator();
    mediator.subscribe('exampleEvent', mock1);
    mediator.subscribe('exampleEvent', mock2);
  });
  test('should call subscribed functions', () => {
    mediator.notify('exampleEvent', {});
    expect(mock1).toBeCalledTimes(1);
    expect(mock2).toBeCalledTimes(1);
  });
  test('should call subscribed functions with given data', () => {
    const testedData = { test: 'test value' };
    mediator.notify('exampleEvent', testedData);
    expect(mock1).toBeCalledWith(testedData);
    expect(mock2).toBeCalledWith(testedData);
  });
});
