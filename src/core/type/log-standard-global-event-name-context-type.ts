export type ProcessStartupFailedContextType = {
  reason: string;
};

export type UseCaseExecutionFailedContextType = {
  reason: string;
  service: string;
  action: string;
};

export type UseCaseValidationFailedContextType = {
  reason: string;
  service: string;
  action: string;
};

export type ServiceRequestFailedContextType = {
  reason: string;
  service: string;
  action: string;
};

export type DatabaseRequestFailedContextType = {
  reason: string;
  service: string;
  action: string;
};

export type SlowHttpRequestContextType = {
  service: string;
  action: string;
  time_spent_ms: number;
  time_limit_ms: number;
};
