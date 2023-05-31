import { levelStringToInt } from './type/log-level';
import { HandlerInterface } from './interface/handler';
import { StreamLoggerInterface } from './interface/stream-logger';

export class Handler implements HandlerInterface {
  constructor(
    private readonly streamLogger: StreamLoggerInterface,
    private readonly level: string,
  ) {}

  isHandling(level: string): boolean {
    return levelStringToInt(level) >= levelStringToInt(this.level);
  }

  handle(message: string): void {
    this.streamLogger.log(message);
  }
}
