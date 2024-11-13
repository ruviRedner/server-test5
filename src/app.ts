import { connectToMongo } from "./config/db";
import exp from "express";
import "dotenv/config";
import userRouter from "./router/userRouter"
import actionRouter from "./router/actionRouter"
import orgRouter from "./router/orgRouter"
import misseilRouter from "./router/missailRouter"

const PORT = process.env.PORT || 3000;

const app = exp();
app.use(exp.json());

connectToMongo()

app.use("/users",userRouter );
app.use("/org", orgRouter);
app.use("/missail", misseilRouter);
app.use("/action", actionRouter);

app.listen(PORT, () => {
    console.log(`server app and runing in port ${PORT}`);
  });