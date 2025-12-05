import dateConverter from './dateConverter';

describe('dateConverter', () => {
  it('converts a timestamp to "Dec 5, 2025, 06:32 PM" format', () => {
    const input = '2025-12-05T18:32:00';
    const result = dateConverter(input);
    expect(result).toBe('Dec 5, 2025, 06:32 PM');
  });

});
