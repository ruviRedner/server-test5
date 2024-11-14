import { Types } from "mongoose";
import { Iorg } from "../interfacec/Iorg";

 interface PayloadDto{
    userId: string | any | Types.ObjectId;
    role: string;
    org: string | Iorg | any;
    username: string;
}
export default PayloadDto