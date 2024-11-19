import { connectToMongo } from "./config/db";
import exp from "express";
import "dotenv/config";
import userRouter from "./router/userRouter"
import actionRouter from "./router/actionRouter"
import orgRouter from "./router/orgRouter"
import misseilRouter from "./router/missailRouter"
import cors from "cors"
import http from 'http';
import { Server } from 'socket.io';
import { handelShackConnection } from "./socket/io";

const PORT = process.env.PORT || 3000;

const app = exp();
app.use(exp.json());
app.use(cors());
const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: "*",
  },
});
io.on("connection", handelShackConnection);

connectToMongo()

app.use("/users",userRouter );
app.use("/org", orgRouter);
app.use("/missail", misseilRouter);
app.use("/action", actionRouter);

httpServer.listen(PORT, () => {
    console.log(`server app and runing in port ${PORT}`);
  });