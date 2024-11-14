import actionModel from "../models/actionModel";
import missailModel from "../models/missailModel";
import userModel from "../models/userModel";
import { ActionDto, InterceptDto } from "../types/DTO/actionDto";
import { StatusAction } from "../types/interfacec/Iaction";

export const handelAttack = async (action: ActionDto) => {
  try {
    const terrorist = await userModel.findOne({
      _id: action.teroristId,
      "org.resources.name": action.misseil,
    });

    if (!terrorist) {
      throw new Error("Missile not found in resources");
    }

    await userModel.updateOne(
      { _id: action.teroristId, "org.resources.name": action.misseil },
      { $inc: { "org.resources.$.amount": -1 } }
    );

    const target = await userModel.find({ location: action.location });

    const missile = await missailModel.findOne({ name: action.misseil });

    if (!target || !missile) {
      throw new Error("Target or missile not found");
    }

    const newAction = new actionModel({
      teroristId: action.teroristId,
      status: StatusAction.lanched,
      target: action.location,
      timeHit: missile.speed,
    });
    let timeHit = missile.speed * 10;
    const interval = setInterval(async () => {
      try {
        const currentAction = await actionModel.findById(newAction._id); 
    
        if (!currentAction) {
          clearInterval(interval);
          return;
        }
    
       
        if (currentAction.status === StatusAction.INTERCEPT) {
          clearInterval(interval);
          console.log("Missile intercepted. Interval stopped.");
          return;
        }
    
        
        timeHit--;
        console.log(`timeHit: ${timeHit}`);
    
        // בדיקה אם הזמן נגמר ולא היה יירוט
        if (timeHit <= 0) {
          clearInterval(interval);
          console.log(`Hit occurred at ${timeHit}`);
    
          currentAction.status = StatusAction.hit;
          await currentAction.save();
        }
      } catch (error) {
        console.error("Error during interval:", error);
        clearInterval(interval);
      }
    }, 1000);
    

    await newAction.save();

    return { status: "DONE" };
  } catch (error) {
    console.error("Error in handelAttack:", error);
    return {
      status: "ERROR",
      err: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const handleDefense = async (action: InterceptDto) => {
  try {
    const launchedAction = await actionModel.findOne({
      status: StatusAction.lanched,
    });

    console.log("Launched action found:", launchedAction);

    if (!launchedAction) {
      throw new Error("No launched action found for this target");
    }

    const target = await userModel.findOne({ _id: action.interceptId });
    const defenseResource = target?.org?.resources.find(
      (resource) => resource.name === action.misseil
    );
    console.log(target);

    if (!target) return;
    console.log(launchedAction.target);
    console.log(target.location);

    if (target?.location !== launchedAction.target) {
      throw new Error("This missiel is not to your location");
    }

    if (!defenseResource || defenseResource.amount <= 0) {
      throw new Error("No defense available for this target");
    }

    await userModel.updateOne(
      { _id: target._id, "org.resources.name": "Defense Shield" },
      { $inc: { "org.resources.$.amount": -1 } }
    );

    launchedAction.status = StatusAction.INTERCEPT;
    await launchedAction.save();

    return { status: "Defense action successful" };
  } catch (error) {
    console.error("Error in handleDefense:", error);
    return {
      status: "ERROR",
      err: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
