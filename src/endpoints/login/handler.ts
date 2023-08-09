import {loginUser} from "./logic";
import {Response} from "../../helpers/responses/APIResponses";

export const handler = async (event) => {
    const body = JSON.parse(event.body);
    if (!body.email || !body.password)
        return Response(400, {message: "No email or password in body"});
    try {
        const token = await loginUser(body.email, body.password);
        return Response(200, {token});
    }
    catch (err) {
        return Response(err.code, err.message);
    }
}
