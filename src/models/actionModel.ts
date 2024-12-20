import { model, Schema } from "mongoose";

import { Iaction } from "../types/interfacec/Iaction";

const actionSchema = new Schema<Iaction>({
  status: {
    type: String,
  },
  target: {
    type: String,
    required: true,
  },
  timeHit: {
    type: Number,
  },
  teroristId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  misseilName:String
});
export default model<Iaction>("Actions", actionSchema);
