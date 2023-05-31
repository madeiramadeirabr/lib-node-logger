import { LogMessageOptions } from '../type/log-message-options-type';

export interface FormatterInterface {
  format(message: string, level: string, options?: LogMessageOptions): string;
}
