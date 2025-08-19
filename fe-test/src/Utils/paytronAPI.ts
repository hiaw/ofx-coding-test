const baseURL = 'https://rates.staging.api.paytron.com/rate/public';

interface GetRateData {
    id: string;
    buyCurrency: string;
    sellCurrency: string;
    wholesaleRate: number;
    retailRate: number;
    createdAt: Date;
    validUntil: Date;
    indicative: boolean;
}

// Doc: https://apidocs.paytron.com/reference/getrate
export const getRate = async (buyCurrency: string, sellCurrency: string): Promise<GetRateData> => {
    const params = new URLSearchParams({ buyCurrency, sellCurrency });
    const result = await fetch(`${baseURL}?${params}`);
    if (result.ok) {
        return result.json();
    }
    throw new Error(result.statusText);
};
