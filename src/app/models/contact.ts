import { User } from "./user";

export class Contact {

    constructor(
        public _id?: string,
        public first_name?: string,
        public last_name?: string,
        public email?: string,
        public contact_num?: number,
        public owner?: string | User,
    ) { }

}