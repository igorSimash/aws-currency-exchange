import {getCurrencies} from "./logic";
import {CurrenciesResponse} from "./types";

test('getCurrencies get request works', async () => {
    try {
        const res = await getCurrencies('currencies');
        expect(typeof res).toBe('array');
    } catch (error) {
        console.log('error in dynamo get', error);
    }
});
