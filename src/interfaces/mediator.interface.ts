/* eslint-disable @typescript-eslint/ban-types */
export interface Subscriber {
  callback: Function;
  thisRef: ThisParameterType<Subscriber['callback']>;
}

export interface Mediator {
  notify(event: string, data: { value: unknown }): void;
  subscribe(event: string, subscriber: Subscriber): void;
  unsubscribe(event: string, subscriber: Subscriber): void;
}

export interface Events {
  [eventName: string]: Subscriber[];
}
