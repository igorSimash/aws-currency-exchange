import {getCurrencies} from "./logic";

test('getCurrencies get request works', async () => {
    try {
        const res = await getCurrencies();
        expect(typeof res).toBe('array');
    } catch (error) {
        console.log('error in dynamo get', error);
    }
});
