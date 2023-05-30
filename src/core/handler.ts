import { levelStringToInt } from "./type/log-level";
import { HandlerInterface } from "./interface/handler";

export class Handler implements HandlerInterface {
    constructor(private readonly level: string) {}

    isHandling(level: string): boolean {
        return levelStringToInt(level) >= levelStringToInt(this.level);
    }

    handle(message: string): void {
        console.log(message);
    }
}