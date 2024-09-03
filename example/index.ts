import { Container, LogLevel, LogStandardGlobalEventNameEnum, UseCaseExecutionFailedContextType } from '../src';

function main() {
  const logger = Container.getLogger({
    level: LogLevel.info,
    serviceName: 'example',
  });

  // Log without standard events
  logger.info('Hello World');

    // Log with standard events
  logger.error('Execution failed', {
    global_event_name: LogStandardGlobalEventNameEnum.USE_CASE_EXECUTION_FAILED,
    context: {
      reason: 'User creation failed',
      service: 'UserCreationUseCase',
      action: 'create',
      stack: 'xxx'
    } as UseCaseExecutionFailedContextType,
  })

  logger.warning('Execution failed', {
    global_event_name: LogStandardGlobalEventNameEnum.USE_CASE_EXECUTION_FAILED,
    context: {
      reason: 'User creation failed',
      service: 'UserCreationUseCase',
      action: 'create',
      stack: 'xxx'
    } as UseCaseExecutionFailedContextType,
  })
}

main();
