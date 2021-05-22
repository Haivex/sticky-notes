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
    }
  }
}
