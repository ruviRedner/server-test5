import { model, Schema } from "mongoose";

import { Imissail } from "../types/interfacec/Imiissail";

const missailSchema = new Schema<Imissail>({
    name: {
        type: String,
        unique: true
    },
    description:String,
    speed:Number,
    intercepts:[String],
    price:Number

})
export default model<Imissail>('missiles', missailSchema)