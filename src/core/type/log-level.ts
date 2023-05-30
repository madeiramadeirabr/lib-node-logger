export enum LogLevel {
    emergency = 'EMERGENCY',
    error = 'ERROR',
    warning = 'WARNING',
    info = 'INFO',
    debug = 'DEBUG',
    trace = 'TRACE'
}

export function levelStringToInt(level: string): number {
    switch (level) {
        case LogLevel.emergency:
            return 5;
        case LogLevel.error:
            return 4;
        case LogLevel.warning:
            return 3;
        case LogLevel.info:
            return 2;
        case LogLevel.debug:
            return 1;
        case LogLevel.trace:
            return 0;
        default:
            return 3;
    }
}