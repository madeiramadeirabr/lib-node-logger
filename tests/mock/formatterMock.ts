import { FormatterInterface } from '../../src/core/interface/formatter';
import { LogMessageOptions } from '../../src/core/type/log-message-options-type';
import { formatInfoResponse } from '../stubs/formatResponse';

export class FormatterMock implements FormatterInterface {

    format(message: string, level: string, options?: LogMessageOptions | undefined): string {
        return formatInfoResponse;
    }
}