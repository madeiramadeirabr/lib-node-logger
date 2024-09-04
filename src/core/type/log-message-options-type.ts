import {
  DatabaseRequestFailedContextType,
  ProcessStartupFailedContextType,
  ServiceRequestFailedContextType,
  SlowHttpRequestContextType,
  UseCaseExecutionFailedContextType,
  UseCaseValidationFailedContextType,
} from './log-standard-global-event-name-context-type';
import { LogStandardGlobalEventNameEnum } from './log-standard-global-event-name.enum';

type LogMessageBaseOptions = {
  global_event_name?: string;
  context?: Record<string, any> | any[];
  trace_id?: string;
  session_id?: string;
};

export type LogMessageOptions =
  | (LogMessageBaseOptions & {
      global_event_name: LogStandardGlobalEventNameEnum.PROCESS_STARTUP_FAILED;
      context: ProcessStartupFailedContextType;
    })
  | (LogMessageBaseOptions & {
      global_event_name: LogStandardGlobalEventNameEnum.USE_CASE_EXECUTION_FAILED;
      context: UseCaseExecutionFailedContextType;
    })
  | (LogMessageBaseOptions & {
      global_event_name: LogStandardGlobalEventNameEnum.USE_CASE_VALIDATION_FAILED;
      context: UseCaseValidationFailedContextType;
    })
  | (LogMessageBaseOptions & {
      global_event_name: LogStandardGlobalEventNameEnum.SERVICE_REQUEST_FAILED;
      context: ServiceRequestFailedContextType;
    })
  | (LogMessageBaseOptions & {
      global_event_name: LogStandardGlobalEventNameEnum.DATABASE_REQUEST_FAILED;
      context: DatabaseRequestFailedContextType;
    })
  | (LogMessageBaseOptions & {
      global_event_name: LogStandardGlobalEventNameEnum.SLOW_HTTP_REQUEST;
      context: SlowHttpRequestContextType;
    })
  | (LogMessageBaseOptions & {
      global_event_name?: string;
      context?: Record<string, any> | any[];
    });
