import { previousDay } from './helpers';

describe('getPreviousDay function', () => {
  it('should return the previous day in ISO-8601 format', () => {
    const day = '2018-10-10';

    const previous = previousDay(day);

    expect(previous).toBe('2018-10-09');
  });

  it('should return the previous day when it\'s in different month', () => {
    const day = '2018-01-01';

    const previous = previousDay(day);

    expect(previous).toBe('2017-12-31');
  });
});
