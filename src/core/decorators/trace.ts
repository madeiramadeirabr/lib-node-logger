import { LoggerInterface } from '../interface/logger';
import { traceGenerator } from '../trace-generator';
import { LogLevel } from '../type/log-level';
import { LogMessageOptions } from '../type/log-message-options-type';

export function withTraceId(logger: LoggerInterface): LoggerInterface {
  return new Proxy(logger, {
    get(target, prop) {
      if (typeof target[prop] === 'function') {
        return (level: LogLevel, message: string, args?: LogMessageOptions) => {
          const modifiedArgs = {
            ...args,
            trace_id: traceGenerator.getTraceId(),
          };

          return target[prop](message, modifiedArgs);
        };
      }
      return target[prop];
    },
  });
}
