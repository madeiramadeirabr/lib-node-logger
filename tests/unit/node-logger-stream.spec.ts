import { NodeStreamLogger } from '../../src/core/node-logger-stream';

describe('NodeStreamLogger', () => {
  let logger: NodeStreamLogger;

  beforeAll(() => {
    logger = new NodeStreamLogger();
    jest.spyOn(process.stdout, 'write').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(logger).toBeDefined();
  });

  it('Should be utf8 encode', () => {
    expect(logger.readableEncoding).toBe('utf8');
  });

  describe('log', () => {
    it('Should call log function with correct params', () => {
      jest.spyOn(logger, 'isPaused').mockReturnValue(false);
      const loggerPush = jest.spyOn(logger, 'push');

      logger.log('message');
      
      expect(loggerPush).toBeCalled();
      expect(loggerPush).toBeCalledWith('message \n');
    });

    it('should not log null messages', () => {
      jest.spyOn(process.stdout, 'write').mockImplementation();

      logger.log(null);

      expect(process.stdout.write).toBeCalledTimes(0);
    });

    it('Should resume stream if it was paused', () => {
      const resumeFn = jest.spyOn(logger, 'resume');
      const loggerPush = jest.spyOn(logger, 'push');

      jest.spyOn(logger, 'isPaused').mockReturnValue(true);

      logger.log('message');

      expect(resumeFn).toBeCalled();
      expect(loggerPush).toBeCalled();
    });
  });
});
