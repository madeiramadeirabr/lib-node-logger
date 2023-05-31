export interface HandlerInterface {
    isHandling(level: string): boolean
    handle(message: string): void
}