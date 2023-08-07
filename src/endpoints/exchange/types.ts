export interface ExchangeRequest {
    fromCurrency: string;
    value: number;
    toCurrencies: string[];
}

export interface ExchangeResponse {
    hash_key: string;
    range_key: string;
    createdAt: string;
    baseCurrency: string;
    result: number;
    resultCurrency: string;
    value: number;
}
