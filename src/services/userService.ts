import { compare, hash } from "bcrypt";
import { LoginDto, RegisterDto } from "../types/DTO/userDto";
import User from "../models/userModel";
import Jwt from "jsonwebtoken";
import orgModel from "../models/orgModel";

export const userLogin = async (user: LoginDto) => {
  try {
    const userFromDb = await User.findOne({ username: user.username }).lean();
    if (!userFromDb) throw new Error("User not found");
    const match = await compare(user.password, userFromDb.password);
    if (!match) throw new Error("Worng password");

    const token = Jwt.sign(
      {
        userId: userFromDb._id,
        role: userFromDb.role,
        org: userFromDb.org,
        username: userFromDb.username,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "10m",
      }
    );

    return { ...userFromDb, token, password: "********" };
  } catch (error) {
    return error;
  }
};

export const userRegister = async (user: RegisterDto) => {
  try {
    const { username, password, org, location, role } = user;
    if (!username || !password || !org || !location || !role) {
      throw new Error("Missing user data, all is require");
    }

    const hashP = await hash(user.password, 10);
    user.password = hashP;
    const newUser = new User({
      username,
      password,
      org,
      location,
      role,
    });
    if(role === "jowish"){
        const organization = await orgModel.findOne({name:`${org} - ${location}`})
        newUser.org = organization!
    }
    
    return await newUser.save();
  } catch (error) {
    throw new Error("Can't do the thing you want me to do");
  }
};
