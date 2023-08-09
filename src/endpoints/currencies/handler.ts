import {getCurrencies} from "./logic";
import {Response} from "../../helpers/responses/APIResponses";

export const handler = async event => {

    try {
        const currencies = await getCurrencies();
        return Response(200, { currencies });
    }
    catch (err) {
        return Response(err.code, err.message);
    }
}
