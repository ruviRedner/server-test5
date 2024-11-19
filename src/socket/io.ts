import { Socket } from "socket.io";
import { io } from "../app";
import { handleDefense } from "../services/actionService";
import { InterceptDto } from "../types/DTO/actionDto";

export const handelShackConnection = (client: Socket) => {
  console.log(`[socket.io]New Connection ${client.id} `);
  client.on("disconnect", () => {
    console.log("Bay Bay user");
  })
  client.on("defence",async (action:InterceptDto) =>{
    const result = await handleDefense(action)
    io.emit("deffenceResult",result)
  })





}
