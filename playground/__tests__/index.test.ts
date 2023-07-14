import { add } from '../src/index';

describe('test add', () => {
  it('should return 3', () => {
    expect(add(1, 2)).toBe(3);
  });
});
