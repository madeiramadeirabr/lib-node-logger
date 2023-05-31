import { LogMessageOptions } from "../type/log-message-options-type";

export interface LoggerInterface {
    trace(message: string, args?: LogMessageOptions): void;
    debug(message: string, args?: LogMessageOptions): void;
    info(message: string, args?: LogMessageOptions): void;
    warning(message: string, args?: LogMessageOptions): void;
    error(message: string, args?: LogMessageOptions): void;
    emergency(message: string, args?: LogMessageOptions): void;
}