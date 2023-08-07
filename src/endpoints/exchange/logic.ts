import {ExchangeRequest, ExchangeResponse} from "./types";

const getCurrency = async (from: string, to: string): Promise<number> => {
    const res = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`);
    return (await res.json())[to];
}
export const getExchanges = async (exchange: ExchangeRequest): Promise<ExchangeResponse[]> => {
    return await Promise.all(exchange.toCurrencies.map(async (currency, index) => (
        {
            hash_key: "user#TEST",
            range_key: `exchange#TESTconversion#${index + 1}`,
            createdAt: 'date-test',
            baseCurrency: exchange.fromCurrency,
            result: await getCurrency(exchange.fromCurrency, currency) * exchange.value,
            resultCurrency: currency,
            value: exchange.value
        }
    )));
}
