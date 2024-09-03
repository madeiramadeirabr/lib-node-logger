import { LogStandardGlobalEventNameEnum } from './type/log-standard-global-event-name.enum';

export const RequiredFieldsMap: Record<
  LogStandardGlobalEventNameEnum,
  string[]
> = {
  [LogStandardGlobalEventNameEnum.PROCESS_STARTUP_FAILED]: ['reason'],
  [LogStandardGlobalEventNameEnum.USE_CASE_EXECUTION_FAILED]: [
    'reason',
    'service',
    'action',
  ],
  [LogStandardGlobalEventNameEnum.USE_CASE_VALIDATION_FAILED]: [
    'reason',
    'service',
    'action',
  ],
  [LogStandardGlobalEventNameEnum.SERVICE_REQUEST_FAILED]: [
    'reason',
    'service',
    'action',
  ],
  [LogStandardGlobalEventNameEnum.DATABASE_REQUEST_FAILED]: [
    'reason',
    'service',
    'action',
  ],
  [LogStandardGlobalEventNameEnum.SLOW_HTTP_REQUEST]: [
    'reason',
    'service',
    'action',
    'time_spent_ms',
    'time_limit_ms',
  ],
};
