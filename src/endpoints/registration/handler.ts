import {Response} from "../../helpers/responses/APIResponses";
import {AddUser} from "./logic";
export const handler = async (event) => {
    const body = JSON.parse(event.body);
    if (!body.email || !body.password)
        return Response(400, {message: "No email or password in body"});

    const newUser = await AddUser(body.email, body.password)
        .catch(err => {
            console.error("Error during inserting", err)
            return null;
        });

    if (!newUser) {
        return Response(400, { message: 'Failed to insert new user' });
    }

    return Response(200, newUser);
}
