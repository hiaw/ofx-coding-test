import { describe, expect, it } from 'vitest';
import { calculateExchangeAmount, calculateExchangeAmountWithOFXMarkup, calculateOFXExchangeRate } from './calculator';

describe('calculator', () => {
    describe('calculateExchangeAmount', () => {
        it('should handle normal calculation', () => {
            expect(calculateExchangeAmount(1, 0.9999)).toBe(0.9999);
        });

        it('should handle lots of digits', () => {
            expect(calculateExchangeAmount(1, 0.123456789)).toBe(0.1235);
        });
    });

    describe('calculateOFXExchangeRate', () => {
        it('should handle normal calculation', () => {
            expect(calculateOFXExchangeRate(1)).toBe(0.995);
        });
    });

    describe('calculateExchangeAmountWithOFXMarkup', () => {
        it('should handle normal calculation', () => {
            expect(calculateExchangeAmountWithOFXMarkup(1, 1.0)).toBe(0.995);
            expect(calculateExchangeAmountWithOFXMarkup(1, 50)).toBe(49.75);
        });
    });
});
