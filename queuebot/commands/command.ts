import { PassThrough } from "stream";
import { userResponse } from "../common/user-response";

export class UserCommand {
    message : string;
    response : userResponse;
    constructor(message :string, response : userResponse) {
        this.message = message;
        this.response = response;
    }

    async run() {
    }

}
