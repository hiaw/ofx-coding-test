export const OFX_MARKUP_RATE = 0.005;
export const ROUNDING_DIGITS = 4;

const rounded = (value: number) => {
    const roundingFactor = Math.pow(10, ROUNDING_DIGITS);
    return Math.round(roundingFactor * value) / roundingFactor;
};

export const calculateExchangeAmount = (amount: number, rate: number) => {
    return rounded(amount * rate);
};

export const calculateOFXExchangeRate = (rate: number) => {
    return rounded(rate * (1 - OFX_MARKUP_RATE));
};

export const calculateExchangeAmountWithOFXMarkup = (amount: number, rate: number) => {
    return rounded(calculateExchangeAmount(amount, calculateOFXExchangeRate(rate)));
};
