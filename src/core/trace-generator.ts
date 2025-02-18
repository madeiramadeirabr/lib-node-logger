import { AsyncLocalStorage } from 'async_hooks';
import { randomUUID } from 'crypto';

class TraceIdService {
  private asyncLocalStorage = new AsyncLocalStorage<Map<string, string>>();

  private ensureContext(): void {
    if (!this.asyncLocalStorage.getStore()) {
      const store = new Map<string, string>();
      store.set('traceId', randomUUID());
      this.asyncLocalStorage.enterWith(store);
    }
  }

  getTraceId(): string {
    this.ensureContext();

    return this.asyncLocalStorage.getStore()?.get('traceId') || '';
  }
}

export const traceGenerator = new TraceIdService();
