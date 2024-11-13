import { model, Schema } from "mongoose";
import { Iorg } from "../types/interfacec/Iorg";

const orgSchema = new Schema<Iorg>({
    name: {
        type: String,
        unique: true
    },
    resources: [
        {
            name:{type:String,unique:true},
            amount:Number
        }
    ],
    budget:Number
})
export default model<Iorg>('organization', orgSchema)