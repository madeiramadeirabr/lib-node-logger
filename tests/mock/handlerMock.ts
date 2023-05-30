import { HandlerInterface } from '../../src/core/interface/handler';

export class HandlerMock implements HandlerInterface {

    isHandling(level: string): boolean {
        return true
    }

    handle(message: string): void {
    }
}