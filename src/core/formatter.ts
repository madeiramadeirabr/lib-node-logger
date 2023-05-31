import { FormatterInterface } from "./interface/formatter";
import { LogMessageOptions } from "./type/log-message-options-type";
import { LogMessage } from "./type/log-message-type";

export class Formatter implements FormatterInterface {

    constructor(private readonly serviceName: string) {}

    format(message: string, level: string, args: LogMessageOptions): string {

        const formattedMessage = {
            message,
            level,
            service_name: this.serviceName,
            global_event_timestamp: new Date().toISOString(),
            ...args,
        } as LogMessage

        return JSON.stringify(formattedMessage);
    }
}