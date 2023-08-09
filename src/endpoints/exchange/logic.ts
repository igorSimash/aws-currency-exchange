import {ExchangeRequest, ExchangeResponse} from "./types";
import {CustomError} from "../../helpers/responses/CustomError";

const getCurrency = async (from: string, to: string): Promise<number> => {
    const res = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`);
    if (!res)
        throw new CustomError(500, 'Error during getting currencies from API')
    return (await res.json())[to];
}
export const getExchanges = async (exchange: ExchangeRequest): Promise<ExchangeResponse[]> => {
    const result = await Promise.all(exchange.toCurrencies.map(async (to_currency, index) => (
        {
            hash_key: "user#TEST",
            range_key: `exchange#TESTconversion#${index + 1}`,
            createdAt: 'date-test',
            baseCurrency: exchange.fromCurrency,
            result: await getCurrency(exchange.fromCurrency, to_currency) * exchange.value,
            resultCurrency: to_currency,
            value: exchange.value
        }
    )));

    if (!result)
        throw new CustomError(500, 'Error during exchanges')

    return result;
}
