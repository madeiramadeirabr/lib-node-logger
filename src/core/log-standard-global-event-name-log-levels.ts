import { LogStandardGlobalEventNameEnum } from './type/log-standard-global-event-name.enum';
import { LogLevel } from './type/log-level';

export const RecommendedLogLevels: Record<
  LogStandardGlobalEventNameEnum,
  LogLevel
> = {
  [LogStandardGlobalEventNameEnum.PROCESS_STARTUP_FAILED]: LogLevel.error,
  [LogStandardGlobalEventNameEnum.USE_CASE_EXECUTION_FAILED]: LogLevel.error,
  [LogStandardGlobalEventNameEnum.USE_CASE_VALIDATION_FAILED]: LogLevel.warning,
  [LogStandardGlobalEventNameEnum.SERVICE_REQUEST_FAILED]: LogLevel.error,
  [LogStandardGlobalEventNameEnum.DATABASE_REQUEST_FAILED]: LogLevel.error,
  [LogStandardGlobalEventNameEnum.SLOW_HTTP_REQUEST]: LogLevel.warning,
};
