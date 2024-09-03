import { LogStandardEventFormatterDecorator } from './../../src/core/log-standard-event-formatter-decorator';
import { LogLevel } from '../../src/core/type/log-level';
import { LogStandardGlobalEventNameEnum } from '../../src/core/type/log-standard-global-event-name.enum';
import { FormatterInterface } from '../../src/core/interface/formatter';

describe('Formatter', () => {
  let mockFormatter: jest.Mocked<FormatterInterface>;
  let logStandardFormatterDecorator: LogStandardEventFormatterDecorator;

  beforeEach(() => {
    mockFormatter = {
      serviceName: 'service',
    } as unknown as jest.Mocked<FormatterInterface>;

    logStandardFormatterDecorator = new LogStandardEventFormatterDecorator(mockFormatter);

    jest
      .spyOn(Date.prototype, 'toISOString')
      .mockReturnValue('2021-01-01T03:00:00.000Z');
  });

  it('Should format correctly with a generic event name', () => {
    const response = logStandardFormatterDecorator.format('mensagem', LogLevel.info, {
      global_event_name: 'teste',
    });

    const expected = JSON.stringify({
      message: 'mensagem',
      level: LogLevel.info,
      global_event_timestamp: '2021-01-01T03:00:00.000Z',
      service_name: 'service',
      global_event_name: 'teste',
      context: {}
    });

    expect(response).toBe(expected);
  });

  it('Should format correctly when PROCESS_STARTUP_FAILED is sent with all required fields and correct log level', () => {
    const response = logStandardFormatterDecorator.format('Startup failed', LogLevel.error, {
      global_event_name: LogStandardGlobalEventNameEnum.PROCESS_STARTUP_FAILED,
      context: {
        reason: 'Database connection failed'
      },
    });

    const expected = {
      message: 'Startup failed',
      level: LogLevel.error,
      global_event_timestamp: '2021-01-01T03:00:00.000Z',
      service_name: 'service',
      global_event_name: LogStandardGlobalEventNameEnum.PROCESS_STARTUP_FAILED,
      context: {
        reason: 'Database connection failed'
      },
    };

    expect(response).toBe(JSON.stringify(expected));
  });

  it('Should handle PROCESS_STARTUP_FAILED with missing fields', () => {
    const response = logStandardFormatterDecorator.format('Startup failed', LogLevel.error, {
      global_event_name: LogStandardGlobalEventNameEnum.PROCESS_STARTUP_FAILED,
      context: {},
    });

    const expected = {
      message: 'Startup failed',
      level: LogLevel.error,
      global_event_timestamp: '2021-01-01T03:00:00.000Z',
      service_name: 'service',
      global_event_name: LogStandardGlobalEventNameEnum.PROCESS_STARTUP_FAILED,
      context: {
        reason: 'The field "reason" is required for the event "PROCESS_STARTUP_FAILED".',
        note: 'Please refer to MMRFC 5 for required fields information.',
      },
    };

    expect(response).toBe(JSON.stringify(expected));
  });

  it('Should handle USE_CASE_EXECUTION_FAILED with missing fields', () => {
    const response = logStandardFormatterDecorator.format('Execution failed', LogLevel.error, {
      global_event_name: LogStandardGlobalEventNameEnum.USE_CASE_EXECUTION_FAILED,
      context: {},
    });

    const expected = {
      message: 'Execution failed',
      level: LogLevel.error,
      global_event_timestamp: '2021-01-01T03:00:00.000Z',
      service_name: 'service',
      global_event_name: LogStandardGlobalEventNameEnum.USE_CASE_EXECUTION_FAILED,
      context: {
        reason: 'The field "reason" is required for the event "USE_CASE_EXECUTION_FAILED".',
        service: 'The field "service" is required for the event "USE_CASE_EXECUTION_FAILED".',
        action: 'The field "action" is required for the event "USE_CASE_EXECUTION_FAILED".',
        note: 'Please refer to MMRFC 5 for required fields information.',
      },
    };

    expect(response).toBe(JSON.stringify(expected));
  });

  it('Should handle USE_CASE_VALIDATION_FAILED with missing fields', () => {
    const response = logStandardFormatterDecorator.format('Validation failed', LogLevel.warning, {
      global_event_name: LogStandardGlobalEventNameEnum.USE_CASE_VALIDATION_FAILED,
      context: {},
    });

    const expected = {
      message: 'Validation failed',
      level: LogLevel.warning,
      global_event_timestamp: '2021-01-01T03:00:00.000Z',
      service_name: 'service',
      global_event_name: LogStandardGlobalEventNameEnum.USE_CASE_VALIDATION_FAILED,
      context: {
        reason: 'The field "reason" is required for the event "USE_CASE_VALIDATION_FAILED".',
        service: 'The field "service" is required for the event "USE_CASE_VALIDATION_FAILED".',
        action: 'The field "action" is required for the event "USE_CASE_VALIDATION_FAILED".',
        note: 'Please refer to MMRFC 5 for required fields information.',
      },
    };

    expect(response).toBe(JSON.stringify(expected));
  });

  it('Should handle SERVICE_REQUEST_FAILED with missing fields', () => {
    const response = logStandardFormatterDecorator.format('Service request failed', LogLevel.error, {
      global_event_name: LogStandardGlobalEventNameEnum.SERVICE_REQUEST_FAILED,
      context: {},
    });

    const expected = {
      message: 'Service request failed',
      level: LogLevel.error,
      global_event_timestamp: '2021-01-01T03:00:00.000Z',
      service_name: 'service',
      global_event_name: LogStandardGlobalEventNameEnum.SERVICE_REQUEST_FAILED,
      context: {
        reason: 'The field "reason" is required for the event "SERVICE_REQUEST_FAILED".',
        service: 'The field "service" is required for the event "SERVICE_REQUEST_FAILED".',
        action: 'The field "action" is required for the event "SERVICE_REQUEST_FAILED".',
        note: 'Please refer to MMRFC 5 for required fields information.',
      },
    };

    expect(response).toBe(JSON.stringify(expected));
  });

  it('Should handle DATABASE_REQUEST_FAILED with missing fields', () => {
    const response = logStandardFormatterDecorator.format('Database request failed', LogLevel.error, {
      global_event_name: LogStandardGlobalEventNameEnum.DATABASE_REQUEST_FAILED,
      context: {},
    });

    const expected = {
      message: 'Database request failed',
      level: LogLevel.error,
      global_event_timestamp: '2021-01-01T03:00:00.000Z',
      service_name: 'service',
      global_event_name: LogStandardGlobalEventNameEnum.DATABASE_REQUEST_FAILED,
      context: {
        reason: 'The field "reason" is required for the event "DATABASE_REQUEST_FAILED".',
        service: 'The field "service" is required for the event "DATABASE_REQUEST_FAILED".',
        action: 'The field "action" is required for the event "DATABASE_REQUEST_FAILED".',
        note: 'Please refer to MMRFC 5 for required fields information.',
      },
    };

    expect(response).toBe(JSON.stringify(expected));
  });

  it('Should handle SLOW_HTTP_REQUEST with missing fields', () => {
    const response = logStandardFormatterDecorator.format('Slow HTTP request', LogLevel.warning, {
      global_event_name: LogStandardGlobalEventNameEnum.SLOW_HTTP_REQUEST,
      context: {},
    });

    const expected = {
      message: 'Slow HTTP request',
      level: LogLevel.warning,
      global_event_timestamp: '2021-01-01T03:00:00.000Z',
      service_name: 'service',
      global_event_name: LogStandardGlobalEventNameEnum.SLOW_HTTP_REQUEST,
      context: {
        reason: 'The field "reason" is required for the event "SLOW_HTTP_REQUEST".',
        service: 'The field "service" is required for the event "SLOW_HTTP_REQUEST".',
        action: 'The field "action" is required for the event "SLOW_HTTP_REQUEST".',
        time_spent_ms: 'The field "time_spent_ms" is required for the event "SLOW_HTTP_REQUEST".',
        time_limit_ms: 'The field "time_limit_ms" is required for the event "SLOW_HTTP_REQUEST".',
        note: 'Please refer to MMRFC 5 for required fields information.',
      },
    };

    expect(response).toBe(JSON.stringify(expected));
  });

  it('Should handle PROCESS_STARTUP_FAILED with incorrect log level and add recommendation', () => {
    const response = logStandardFormatterDecorator.format('Startup failed', LogLevel.warning, {
      global_event_name: LogStandardGlobalEventNameEnum.PROCESS_STARTUP_FAILED,
      context: {},
    });

    const expected = {
      message: 'Startup failed',
      level: LogLevel.warning,
      global_event_timestamp: '2021-01-01T03:00:00.000Z',
      service_name: 'service',
      global_event_name: LogStandardGlobalEventNameEnum.PROCESS_STARTUP_FAILED,
      context: {
        reason: 'The field "reason" is required for the event "PROCESS_STARTUP_FAILED".',
        note: 'Please refer to MMRFC 5 for required fields information.',
        recommendation: 'It is recommended to use the log level "ERROR" for the event "PROCESS_STARTUP_FAILED".',
      },
    };

    expect(response).toBe(JSON.stringify(expected));
  });
});