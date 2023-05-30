import { LoggerInterface } from "./core/interface/logger";
import { Logger } from "./core/logger";
import { HandlerInterface } from "./core/interface/handler";
import { Handler } from "./core/handler";
import { FormatterInterface } from "./core/interface/formatter";
import { Formatter } from "./core/formatter"
import { Config } from "./core/type/config"

export class Container {
    private static dependencies: Map<string, any> = new Map();

    private static make<T = any>(key: string, makeDependency: () => T): T {
        const dependency = Container.dependencies.get(key);
        if (dependency) return dependency;
        const dependencyInstance = makeDependency();
        Container.dependencies.set(key, dependencyInstance);
        return dependencyInstance;
    }

    public static getLogger({ level, serviceName }: Config): LoggerInterface{
        return Container.make<LoggerInterface>("Logger", () => {

            const logger = new Logger(
                Container.makeHandler(level),
                Container.makeFormatter(serviceName)
            );

            return logger; 
        })
    }

    public static makeHandler(level: string): HandlerInterface{
        return Container.make<HandlerInterface>("Handler", () => {
            return new Handler(level);
        })
    }

    public static makeFormatter(serviceName: string): FormatterInterface{
        return Container.make<FormatterInterface>("Formatter", () => {
            return new Formatter(serviceName);
        })
    }
}

