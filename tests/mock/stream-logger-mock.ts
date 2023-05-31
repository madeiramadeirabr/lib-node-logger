import { StreamLoggerInterface } from '../../src/core/interface/stream-logger';

export class StreamLoggerMock implements StreamLoggerInterface {
  private messages: string[] = [];

  log(message: string): void {
    this.messages.push(message);
  }

  getMessages(): string[] {
    return this.messages;
  }
}
