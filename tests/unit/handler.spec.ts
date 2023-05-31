import { LogLevel } from '../../src/core/type/log-level';
import { Handler } from '../../src/core/handler';
import { createMock } from 'ts-auto-mock';
import { StreamLoggerInterface } from '../../src/core/interface/stream-logger';

describe('Handler', () => {
  let streamLoggerMock: StreamLoggerInterface;

  beforeAll(() => {
    streamLoggerMock = createMock<StreamLoggerInterface>();
  });

  describe('isHandling', () => {
    const levels = Object.values(LogLevel);

    levels.map((levelHandler) => {
      let handler = new Handler(streamLoggerMock, levelHandler);
      levels.map((levelMessage) => {
        let expected =
          handler.levelStringToInt(levelMessage) >=
          handler.levelStringToInt(levelHandler);

        it(`Should return ${expected} when message is ${levelMessage} and handler is ${levelHandler}`, () => {
          let response = handler.isHandling(levelMessage);

          expect(response).toBe(expected);
        });
      });
    });
  });

  describe('handle', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should call log function with correct params', () => {
      const handler = new Handler(streamLoggerMock, LogLevel.info);

      handler.handle('message');
      expect(streamLoggerMock.log).toBeCalledTimes(1);
      expect(streamLoggerMock.log).toBeCalledWith('message');
    });
  });
});
