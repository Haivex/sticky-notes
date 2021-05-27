import { Events, Mediator, Subscriber } from '../interfaces/mediator.interface';

export default class StickyNoteMediator implements Mediator {
  private events: Events = {};

  notify(event: string, data: { value: unknown }): void {
    this.events[event].forEach((sub) =>
      sub.callback.call(sub.thisRef, data.value),
    );
  }

  subscribe(event: string, subscriber: Subscriber): void {
    if (!this.events[event]) {
      this.events[event] = [subscriber];
      return;
    }
    if (this.events[event].includes(subscriber)) return;
    this.events[event].push(subscriber);
  }

  unsubscribe(event: string, subscriber: Subscriber): void {
    if (!this.events[event]) return;
    if (this.events[event].includes(subscriber)) {
      this.events[event] = this.events[event].filter(
        (sub) => sub !== subscriber,
      );
    }
  }

  getEvents(): Events {
    return this.events;
  }
}
