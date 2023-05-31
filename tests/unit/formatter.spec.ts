import { LogLevel } from '../../src/core/type/log-level';
import { Formatter } from '../../src/core/formatter';
import { formatInfoResponse } from '../stubs/formatResponse';

describe('Formatter', () => {
  let formatter = new Formatter('service');

  beforeEach(() => {
    jest
      .spyOn(Date.prototype, 'toISOString')
      .mockReturnValue('2021-01-01T03:00:00.000Z');
  });

  it('Should format correctly', () => {
    const response = formatter.format('mensagem', LogLevel.info, {
      global_event_name: 'teste',
    });
    const expected = formatInfoResponse;

    expect(response).toBe(expected);
  });
});
