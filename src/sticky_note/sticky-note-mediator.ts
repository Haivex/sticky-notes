import { Mediator, Subscriber } from '../interfaces/mediator.interface';

export default class StickyNoteMediator implements Mediator {
  private events: {
    [eventName: string]: Subscriber[];
  } = {};

  notify(event: string, data: Record<string, unknown>): void {
    this.events[event].forEach((fn) => fn.call(data));
  }

  subscribe(event: string, subscriber: Subscriber): void {
    if (!this.events[event]) {
      this.events[event] = [subscriber];
      return;
    }
    if (this.events[event].includes(subscriber)) return;
    this.events[event].push(subscriber);
  }

  /* eslint-disable class-methods-use-this */
  usubscribe(event: string, subscriber: Subscriber): void {}
}
