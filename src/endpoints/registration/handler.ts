import {Response} from "../../helpers/responses/APIResponses";
import {AddUser} from "./logic";

export const handler = async (event) => {
    const body = JSON.parse(event.body);
    if (!body.email || !body.password)
        return Response(400, {message: "No email or password in body"});
    try {
        const newUser = await AddUser(body.email, body.password);
        return Response(200, newUser);
    }
    catch (err) {
        return Response(err.code, err.message);
    }
}
