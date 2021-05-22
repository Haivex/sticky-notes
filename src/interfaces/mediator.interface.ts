export interface Subscriber {
  (): unknown;
}

export interface Mediator {
  notify(event: string, data: Record<string, unknown>): void;
  subscribe(event: string, subscriber: Subscriber): void;
  unsubscribe(event: string, subscriber: Subscriber): void;
}

export interface Events {
  [eventName: string]: Subscriber[];
}
