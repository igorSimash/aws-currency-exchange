import {Response} from "../../helpers/responses/APIResponses";
import {ExchangeRequest} from "./types";
import {getExchanges} from "./logic";

export const handler = async event => {
    const {fromCurrency, value, toCurrencies}: ExchangeRequest = JSON.parse(event.body);
    if (!fromCurrency || !value || !toCurrencies)
        return Response(400, {message: "No 'fromCurrency', 'value' or 'toCurrencies' in request body"});
    try {
        const response = await getExchanges({fromCurrency, value, toCurrencies});
        return Response(200, {exchanges: response});
    }
    catch (err) {
        return Response(err.code, err.message);
    }


}
