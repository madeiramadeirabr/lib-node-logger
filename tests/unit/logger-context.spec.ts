import { Logger } from '../../src/core/logger';
import { HandlerInterface } from '../../src/core/interface/handler';
import { FormatterInterface } from '../../src/core/interface/formatter';
import { LogLevel } from '../../src/core/type/log-level';
import { LogContextProviderInterface } from '../../src/core/interface/log-context-provider';

describe('Logger Context Providers', () => {
  let handlerMock: HandlerInterface;
  let formatterMock: FormatterInterface;

  beforeEach(() => {
    handlerMock = {
      isHandling: jest.fn().mockReturnValue(true),
      handle: jest.fn(),
    } as any;

    formatterMock = {
      format: jest.fn(),
    } as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should enrich log message with data from a single context provider', () => {
    const providerMock: LogContextProviderInterface = {
      getContext: jest
        .fn()
        .mockReturnValue({ trace_id: '123', span_id: '456' }),
    };

    const logger = new Logger(handlerMock, formatterMock, [providerMock]);
    logger.info('test message');

    expect(formatterMock.format).toHaveBeenCalledWith(
      'test message',
      LogLevel.info,
      { trace_id: '123', span_id: '456' },
    );
  });

  it('Should enrich log message with data from multiple context providers', () => {
    const provider1: LogContextProviderInterface = {
      getContext: jest.fn().mockReturnValue({ trace_id: '123' }),
    };
    const provider2: LogContextProviderInterface = {
      getContext: jest.fn().mockReturnValue({ user_id: 'abc' }),
    };

    const logger = new Logger(handlerMock, formatterMock, [
      provider1,
      provider2,
    ]);
    logger.info('test message');

    expect(formatterMock.format).toHaveBeenCalledWith(
      'test message',
      LogLevel.info,
      { trace_id: '123', user_id: 'abc' },
    );
  });

  it('Should prioritize explicit log arguments over context provider data', () => {
    const provider: LogContextProviderInterface = {
      getContext: jest.fn().mockReturnValue({ trace_id: 'provider-id' }),
    };

    const logger = new Logger(handlerMock, formatterMock, [provider]);

    // Explicit trace_id should win
    logger.info('test message', { trace_id: 'explicit-id' });

    expect(formatterMock.format).toHaveBeenCalledWith(
      'test message',
      LogLevel.info,
      { trace_id: 'explicit-id' },
    );
  });

  it('Should not call context providers if log level is not being handled', () => {
    jest.spyOn(handlerMock, 'isHandling').mockReturnValue(false);

    const provider: LogContextProviderInterface = {
      getContext: jest.fn(),
    };

    const logger = new Logger(handlerMock, formatterMock, [provider]);
    logger.info('test message');

    expect(provider.getContext).not.toHaveBeenCalledWith();
    expect(formatterMock.format).not.toHaveBeenCalledWith();
  });

  it('Should work correctly when no context providers are provided (original behavior)', () => {
    const logger = new Logger(handlerMock, formatterMock);
    logger.info('test message', { custom: 'data' });

    expect(formatterMock.format).toHaveBeenCalledWith(
      'test message',
      LogLevel.info,
      { custom: 'data' },
    );
  });
});
