import { model, Schema } from "mongoose";
import { Iuser } from "../types/interfacec/Iuser";


const userSchema = new Schema<Iuser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  org: { 
    type: Schema.Types.Mixed,  
    required: true,
  },
  location: String,
  role: {
    type: String,
    required: true,
  },
});

export default model<Iuser>("users", userSchema);
