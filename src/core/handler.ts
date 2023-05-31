import { LogLevel } from './type/log-level';
import { HandlerInterface } from './interface/handler';
import { StreamLoggerInterface } from './interface/stream-logger';

export class Handler implements HandlerInterface {
  constructor(
    private readonly streamLogger: StreamLoggerInterface,
    private readonly level: string,
  ) {}

  isHandling(level: string): boolean {
    return this.levelStringToInt(level) >= this.levelStringToInt(this.level);
  }

  handle(message: string): void {
    this.streamLogger.log(message);
  }

  levelStringToInt(level: string): number {
    switch (level) {
      case LogLevel.emergency:
        return 5;
      case LogLevel.error:
        return 4;
      case LogLevel.warning:
        return 3;
      case LogLevel.info:
        return 2;
      case LogLevel.debug:
        return 1;
      case LogLevel.trace:
        return 0;
      default:
        return 3;
    }
  }
}
