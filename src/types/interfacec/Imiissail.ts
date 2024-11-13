import { Document } from "mongoose";

export interface Imissail extends Document {
  name: string;
  description: string;
  speed: number;
  intercepts: string[];
  price: number;
}
