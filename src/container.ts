import { LoggerInterface } from './core/interface/logger';
import { Logger } from './core/logger';
import { HandlerInterface } from './core/interface/handler';
import { Handler } from './core/handler';
import { FormatterInterface } from './core/interface/formatter';
import { Formatter } from './core/formatter';
import { Config } from './core/type/config';
import { NodeStreamLogger } from './core/node-logger-stream';
import { StreamLoggerInterface } from './core/interface/stream-logger';
import { LogStandardEventFormatterDecorator } from './core/log-standard-event-formatter-decorator';

export class Container {
  private static dependencies: Map<string, any> = new Map();

  private static make<T = any>(key: string, makeDependency: () => T): T {
    const dependency = Container.dependencies.get(key);
    if (dependency) return dependency;
    const dependencyInstance = makeDependency();
    Container.dependencies.set(key, dependencyInstance);
    return dependencyInstance;
  }

  public static getLogger({ level, serviceName, isDevelopmentEnv }: Config): LoggerInterface {
    return Container.make<LoggerInterface>('Logger', () => {
      const logger = new Logger(
        Container.makeHandler(level),
        Container.makeFormatter(serviceName, isDevelopmentEnv),
      );

      return logger;
    });
  }

  public static makeHandler(level: string): HandlerInterface {
    return Container.make<HandlerInterface>('Handler', () => {
      return new Handler(this.makeStreamLogger(), level);
    });
  }

  public static makeFormatter(serviceName: string, isDevelopmentEnv: boolean ): FormatterInterface {
    return Container.make<FormatterInterface>('Formatter', () => {
      const baseFormatter = new Formatter(serviceName, isDevelopmentEnv);
      const decoratedFormatter = new LogStandardEventFormatterDecorator(
        baseFormatter,
      );
      return decoratedFormatter;
    });
  }

  public static makeStreamLogger(): StreamLoggerInterface {
    return Container.make<NodeStreamLogger>('StreamLogger', () => {
      return new NodeStreamLogger();
    });
  }
}
