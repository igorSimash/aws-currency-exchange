import {Response} from "../../helpers/responses/APIResponses";
import {ExchangeRequest} from "./types";
import {getExchanges} from "./logic";

export const handler = async event => {
    const body: ExchangeRequest = JSON.parse(event.body);

    const response = await getExchanges(body);
    return Response(200, {exchanges: response});
}
