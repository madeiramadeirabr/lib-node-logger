import { createMock } from 'ts-auto-mock';
import { Logger } from '../../src/core/logger';
import { HandlerInterface } from '../../src/core/interface/handler';
import { FormatterInterface } from '../../src/core/interface/formatter';
import { LogLevel } from '../../src/core/type/log-level';
import {
  formatDebugResponse,
  formatEmergencyResponse,
  formatErrorResponse,
  formatInfoResponse,
  formatTraceResponse,
  formatWarningResponse,
} from '../stubs/format-response';

describe('Logger', () => {
  let handlerMock = createMock<HandlerInterface>({
    isHandling: jest.fn(),
    handle: jest.fn(),
  });

  let formatterMock = createMock<FormatterInterface>({
    format: jest.fn(),
  });

  let logger = new Logger(handlerMock, formatterMock);

  beforeEach(() => {
    jest
      .spyOn(Date.prototype, 'toISOString')
      .mockReturnValue('2021-01-01T03:00:00.000Z');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should call isHandling with correct payload', () => {
    jest.spyOn(handlerMock, 'isHandling').mockImplementation(() => false);

    logger.log(LogLevel.info, 'mensagem');

    expect(handlerMock.isHandling).toBeCalledTimes(1);
    expect(handlerMock.isHandling).toBeCalledWith(LogLevel.info);
  });

  it('Should return false when isHandling is false', () => {
    jest.spyOn(handlerMock, 'isHandling').mockImplementation(() => false);

    const response = logger.log(LogLevel.info, 'mensagem');

    expect(handlerMock.isHandling).toBeCalledTimes(1);
    expect(handlerMock.isHandling).toBeCalledWith(LogLevel.info);
    expect(response).toBeFalsy();
  });

  it('Should call format when isHandling is true', () => {
    jest.spyOn(handlerMock, 'isHandling').mockImplementation(() => true);

    logger.log(LogLevel.info, 'mensagem', { global_event_name: 'teste' });

    expect(formatterMock.format).toBeCalledTimes(1);
    expect(formatterMock.format).toBeCalledWith('mensagem', LogLevel.info, {
      global_event_name: 'teste',
    });
  });

  it('Should call handle when isHandling is true', () => {
    jest.spyOn(handlerMock, 'isHandling').mockImplementation(() => true);
    jest
      .spyOn(formatterMock, 'format')
      .mockImplementation(() => formatInfoResponse);

    logger.log(LogLevel.info, 'mensagem', { global_event_name: 'teste' });

    expect(handlerMock.handle).toBeCalledTimes(1);
    expect(handlerMock.handle).toBeCalledWith(formatInfoResponse);
  });

  it('Should return true when success', () => {
    jest.spyOn(handlerMock, 'isHandling').mockImplementation(() => true);
    jest
      .spyOn(formatterMock, 'format')
      .mockImplementation(() => formatInfoResponse);

    const response = logger.log(LogLevel.info, 'mensagem', {
      global_event_name: 'teste',
    });

    expect(response).toBeTruthy();
  });

  it('Should call Log with Trace params and handle with correctly params', () => {
    jest.spyOn(handlerMock, 'isHandling').mockImplementation(() => true);
    jest
      .spyOn(formatterMock, 'format')
      .mockImplementation(() => formatTraceResponse);

    logger.trace('message', { global_event_name: 'teste' });
    expect(handlerMock.handle).toBeCalledTimes(1);
    expect(handlerMock.handle).toBeCalledWith(formatTraceResponse);
  });

  it('Should call Log with Debug params and handle with correctly params', () => {
    jest.spyOn(handlerMock, 'isHandling').mockImplementation(() => true);
    jest
      .spyOn(formatterMock, 'format')
      .mockImplementation(() => formatDebugResponse);

    logger.debug('message', { global_event_name: 'teste' });
    expect(handlerMock.handle).toBeCalledTimes(1);
    expect(handlerMock.handle).toBeCalledWith(formatDebugResponse);
  });

  it('Should call Log with Info params and handle with correctly params', () => {
    jest.spyOn(handlerMock, 'isHandling').mockImplementation(() => true);
    jest
      .spyOn(formatterMock, 'format')
      .mockImplementation(() => formatInfoResponse);

    logger.info('message', { global_event_name: 'teste' });
    expect(handlerMock.handle).toBeCalledTimes(1);
    expect(handlerMock.handle).toBeCalledWith(formatInfoResponse);
  });

  it('Should call Log with Warning params and handle with correctly params', () => {
    jest.spyOn(handlerMock, 'isHandling').mockImplementation(() => true);
    jest
      .spyOn(formatterMock, 'format')
      .mockImplementation(() => formatWarningResponse);

    logger.warning('message', { global_event_name: 'teste' });
    expect(handlerMock.handle).toBeCalledTimes(1);
    expect(handlerMock.handle).toBeCalledWith(formatWarningResponse);
  });

  it('Should call Log with Error params and handle with correctly params', () => {
    jest.spyOn(handlerMock, 'isHandling').mockImplementation(() => true);
    jest
      .spyOn(formatterMock, 'format')
      .mockImplementation(() => formatErrorResponse);

    logger.error('message', { global_event_name: 'teste' });
    expect(handlerMock.handle).toBeCalledTimes(1);
    expect(handlerMock.handle).toBeCalledWith(formatErrorResponse);
  });

  it('Should call Log with Emergency params and handle with correctly params', () => {
    jest.spyOn(handlerMock, 'isHandling').mockImplementation(() => true);
    jest
      .spyOn(formatterMock, 'format')
      .mockImplementation(() => formatEmergencyResponse);

    logger.emergency('message', { global_event_name: 'teste' });
    expect(handlerMock.handle).toBeCalledTimes(1);
    expect(handlerMock.handle).toBeCalledWith(formatEmergencyResponse);
  });
});
