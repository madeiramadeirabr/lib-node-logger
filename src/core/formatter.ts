import { FormatterInterface } from './interface/formatter';
import { LogMessageOptions } from './type/log-message-options-type';
import { LogMessage } from './type/log-message-type';

export class Formatter implements FormatterInterface {
  constructor(
    private readonly serviceName: string,
    private readonly isDevelopmentEnv?: boolean,
  ) {}

  format(message: string, level: string, args: LogMessageOptions): string {
    const formattedMessage = {
      message,
      level,
      service_name: this.serviceName,
      global_event_timestamp: new Date().toISOString(),
      ...args,
    } as LogMessage;

    if (this.isDevelopmentEnv) {
      console.log(formattedMessage);
      return '';
    }

    return JSON.stringify(formattedMessage);
  }
}
