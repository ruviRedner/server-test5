import { io } from "../app";
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
    const misseilResources = terrorist.org?.resources.find(
      (reso) => reso.name === action.misseil
    );
    if (!misseilResources) {
      throw new Error("No resources found");
    }
    if (misseilResources.amount <= 0) {
      throw new Error("You d'ont have misseils to fire ");
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
      misseilName: action.misseil,
    });

    let timeHit = missile.speed;
    const interval = setInterval(async () => {
      try {
        const currentAction = await actionModel.findById(newAction._id);

        if (!currentAction) {
          clearInterval(interval);
          return;
        }

        if (currentAction.status === StatusAction.INTERCEPT) {
          clearInterval(interval);

          return;
        }

        timeHit--;
        // console.log(`timeHit: ${timeHit}`);

        io.emit("attackTimer", {
          remainingTime: timeHit,
          actionID: newAction._id,
        });

        if (timeHit <= 0) {
          clearInterval(interval);
          // console.log(`Hit occurred at ${timeHit}`);

          currentAction.status = StatusAction.hit;
          await currentAction.save();
          io.emit("attackHit", { location: action.location });
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

    if (!launchedAction) {
      throw new Error("No launched action found for this target");
    }
    if (launchedAction.status === StatusAction.hit) {
      throw new Error("Soory the miisile alredy hit");
    }

    const target = await userModel.findOne({ _id: action.interceptId });
    const defenseResource = target?.org?.resources.find(
      (resource) => resource.name === action.misseil
    );

    if (!target) return;

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

export const getListAction = async () => {
  try {
    const actions = await actionModel.find({});
    return actions;
  } catch (error) {
    console.error("Error in getListAction:", error);
    return {
      status: "ERROR",
      err: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
