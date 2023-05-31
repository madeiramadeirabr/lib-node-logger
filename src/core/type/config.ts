import { LogLevel } from "./log-level";

export type Config = {
  level: LogLevel;
  serviceName: string;
};
