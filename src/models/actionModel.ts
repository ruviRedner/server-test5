import { model, Schema } from "mongoose";

import { Iaction } from "../types/interfacec/Iaction";

const actionSchema = new Schema<Iaction>({
  status: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  timeHit: {
    type: Date,
  },
  terorestId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});
export default model<Iaction>("Actions", actionSchema);
