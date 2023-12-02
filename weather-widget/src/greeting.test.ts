import { describe, test, expect } from 'vitest';
import { greeting } from './greeting';

describe('greeting', () => {
  test('greets name', () => {
    const result = greeting('name');
    expect(result).toBe('Welcome name');
  });
});
