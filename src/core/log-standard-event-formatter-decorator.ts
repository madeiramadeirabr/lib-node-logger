import { FormatterInterface } from './interface/formatter';
import { LogLevel } from './type/log-level';
import { LogMessageOptions } from './type/log-message-options-type';
import { LogStandardGlobalEventNameEnum } from './type/log-standard-global-event-name.enum';
import { RequiredFieldsMap } from './log-standard-global-event-name-required-fields';
import { RecommendedLogLevels } from './log-standard-global-event-name-log-levels';

export class LogStandardEventFormatterDecorator implements FormatterInterface {
  constructor(private readonly baseFormatter: FormatterInterface) {}

  private isKnownEventName(
    eventName: string,
  ): eventName is LogStandardGlobalEventNameEnum {
    return RequiredFieldsMap.hasOwnProperty(eventName);
  }

  private fillMissingFields(
    event: LogStandardGlobalEventNameEnum,
    context: Record<string, any>,
  ): void {
    const requiredFields = RequiredFieldsMap[event];
    let missingFieldFound = false;

    requiredFields.forEach((field) => {
      if (!(field in context)) {
        context[
          field
        ] = `The field "${field}" is required for the event "${event}".`;
        missingFieldFound = true;
      }
    });

    if (missingFieldFound) {
      context.note = 'Please refer to MMRFC 5 for required fields information.';
    }
  }

  private addLogLevelRecommendation(
    event: LogStandardGlobalEventNameEnum,
    level: LogLevel,
    context: Record<string, any>,
  ): void {
    const recommendedLevel = RecommendedLogLevels[event];
    if (level !== recommendedLevel) {
      context.recommendation = `It is recommended to use the log level "${recommendedLevel}" for the event "${event}".`;
    }
  }

  format(message: string, level: LogLevel, args?: LogMessageOptions): string {
    const formattedMessage = {
      message,
      level,
      global_event_timestamp: new Date().toISOString(),
      service_name: this.baseFormatter['serviceName'],
      global_event_name: args?.global_event_name,
      context: {},
    };

    if (
      !args ||
      !args.global_event_name ||
      !this.isKnownEventName(args.global_event_name)
    ) {
      return JSON.stringify({
        ...formattedMessage,
        context: args?.context || {},
      });
    }

    args.context = args.context || {};

    this.fillMissingFields(args.global_event_name, args.context);
    this.addLogLevelRecommendation(args.global_event_name, level, args.context);

    return JSON.stringify({
      ...formattedMessage,
      context: args.context,
    });
  }
}