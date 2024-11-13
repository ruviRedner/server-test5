import { connect } from "mongoose";
 export const connectToMongo = async()=>{
    try {
      await  connect(process.env.DB_URL as string)
      console.log("conncted to mongo ")
    } catch (error) {
       console.log("can`t connedt to mongo",error) 
    }
}
