import {getCurrencies} from "./logic";
import {Response} from "../../helpers/responses/APIResponses";

export const handler = async event => {
    const currencies = await getCurrencies();

    if (!currencies) {
        return Response(400, { message: 'Failed to get currencies' });
    }

    return Response(200, { currencies });
}
