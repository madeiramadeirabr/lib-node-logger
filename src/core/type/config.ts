import { LogContextProviderInterface } from '../interface/log-context-provider';
import { LogLevel } from './log-level';

export type Config = {
  level: LogLevel;
  serviceName: string;
  isDevelopmentEnv?: boolean;
  contextProviders?: LogContextProviderInterface[];
};
