import {loginUser} from "./logic";
import {Response} from "../../helpers/responses/APIResponses";

export const handler = async (event) => {
    const body = JSON.parse(event.body);
    if (!body.email || !body.password)
        return Response(400, {message: "No email or password in body"});

    const token = await loginUser(body.email, body.password);

    if (!token)
        return Response(400, { message: 'Failed to insert new user' });

    return Response(200, token);
}
