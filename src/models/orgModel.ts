import { model, Schema } from "mongoose";
import { Iorg } from "../types/interfacec/Iorg";

const orgSchema = new Schema<Iorg>({
    orgName: {
        type: String,
        required: true,
        
    },
    resources:[ 
        {
            name:{type:String, required:true},
            amount:Number
        }]
    ,
    budget:Number
})
export default model<Iorg>('organization', orgSchema)