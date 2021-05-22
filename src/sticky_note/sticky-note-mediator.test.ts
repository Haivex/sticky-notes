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
