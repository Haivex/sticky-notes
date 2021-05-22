export interface Subscriber {
  (): unknown;
}

export interface Mediator {
  notify(event: string, data: Record<string, unknown>): void;
  subscribe(event: string, subscriber: Subscriber): void;
  usubscribe(event: string, subscriber: Subscriber): void;
}
