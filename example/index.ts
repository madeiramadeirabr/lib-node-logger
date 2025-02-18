import { Container } from '../src/container';
import { LogLevel } from '../src/core/type/log-level';

function main() {
  const logger = Container.getLogger({
    level: LogLevel.info,
    serviceName: 'example',
    enableTraceId: true,
    isDevelopmentEnv: true,
  });

  logger.info('Hello World');
}

main();
