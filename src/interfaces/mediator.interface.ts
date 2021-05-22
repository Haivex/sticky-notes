export interface Mediator {
  notify(event: string, data: Record<string, unknown>): void;
  subscribe(event: string, subscriber: Record<string, unknown>): void;
  usubscribe(event: string, subscriber: Record<string, unknown>): void;
}
