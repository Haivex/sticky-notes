export interface Mediator {
  notify(event: string, data: Record<string, unknown>): void;
  subscribe(subscriber: Record<string, unknown>): void;
  usubscribe(subscriber: Record<string, unknown>): void;
}
