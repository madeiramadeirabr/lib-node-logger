import { LoggerInterface } from './interface/logger';
import { HandlerInterface } from './interface/handler';
import { FormatterInterface } from './interface/formatter';
import { LogLevel } from './type/log-level';
import { LogMessageOptions } from './type/log-message-options-type';

export class Logger implements LoggerInterface {
  constructor(
    private readonly handler: HandlerInterface,
    private readonly formatter: FormatterInterface,
  ) {}

  log(level: LogLevel, message: string, args?: LogMessageOptions): boolean {
    if (!this.handler.isHandling(level)) {
      return false;
    }

    const formattedMessage = this.formatter.format(message, level, args);

    this.handler.handle(formattedMessage);

    return true;
  }

  trace(message: string, args?: LogMessageOptions): void {
    this.log(LogLevel.trace, message, args);
  }

  debug(message: string, args?: LogMessageOptions): void {
    this.log(LogLevel.debug, message, args);
  }

  info(message: string, args?: LogMessageOptions): void {
    this.log(LogLevel.info, message, args);
  }

  warning(message: string, args?: LogMessageOptions): void {
    this.log(LogLevel.warning, message, args);
  }

  error(message: string, args?: LogMessageOptions): void {
    this.log(LogLevel.error, message, args);
  }

  emergency(message: string, args?: LogMessageOptions): void {
    this.log(LogLevel.emergency, message, args);
  }
}
