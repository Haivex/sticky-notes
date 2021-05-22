import { Mediator } from '../interfaces/mediator.interface';

export default class StickyNoteMediator implements Mediator {
  private events: {
    [eventName: string]: { (): unknown }[];
  } = {};

  notify(event: string, data: Record<string, unknown>): void {
    this.events[event].forEach((fn) => fn.call(data));
  }
}
