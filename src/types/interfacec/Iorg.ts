import { Document } from "mongoose";

export interface Iorg extends Document {
  orgName: string;
  resources: {
    name: string | null;
    amount: number;
  }[];

  budget: number;
}
