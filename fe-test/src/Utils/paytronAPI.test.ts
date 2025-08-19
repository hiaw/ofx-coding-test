import { describe, expect, it } from 'vitest';
import { calculateExchangeAmount, calculateExchangeAmountWithOFXMarkup, calculateOFXExchangeRate } from './calculator';
import { getRate } from './paytronAPI';

describe('paytronAPI', () => {
    describe('getRate', () => {
        it('should be able to get rate in normal cases', async () => {
            const response = await getRate('NZD', 'AUD');
            expect(response).toHaveProperty('retailRate');
        });

        it('should throw error for invalid input', async () => {
            await expect(getRate('', 'AUD')).rejects.toThrowError();
        });
    });
});
