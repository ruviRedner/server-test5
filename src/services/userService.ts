import { compare, hash } from "bcrypt";
import { LoginDto, RegisterDto } from "../types/DTO/userDto";
import User from "../models/userModel";
import Jwt from "jsonwebtoken";
import orgModel from "../models/orgModel";
import PayloadDto from "../types/DTO/payload";
import { Profile } from "../types/DTO/profile";
import { io } from "../app";

export const userLogin = async (user: LoginDto) => {
  try {
    const userFromDb = await User.findOne({ username: user.username }).lean();

    if (!userFromDb) throw new Error("User not found");
    const match = await compare(user.password, userFromDb.password);

    if (!match) throw new Error("Worng password");
    const payload: PayloadDto = {
      userId: userFromDb._id,
      role: userFromDb.role,
      org: userFromDb.org,
      username: userFromDb.username,
    };
    const token = Jwt.sign(
      payload,

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

    if (!username || !password || !org || !role) {
      throw new Error("Missing user data, all fields are required");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error("Username is already taken");
    }

    const hashedPassword = await hash(password, 10);

    let organization;
    if (role === "jewish") {
      if (!location) throw new Error("Location is required for defense roles");
      organization = await orgModel.findOne({
        orgName: `${org} - ${location}`,
      });
    } else if (role === "terrorist") {
      organization = await orgModel.findOne({ orgName: org });
    }

    if (!organization) {
      throw new Error(
        "Organization not found for the specified role and location"
      );
    }

    const newUser = new User({
      username,
      password: hashedPassword,
      org: organization,
      role,
      ...(role === "jewish" && { location }),
    });

    await newUser.save();

    return { message: "User registered successfully", user: newUser };
  } catch (error: Error | unknown) {
    throw new Error(`Registration failed: ${(error as Error).message}`);
  }
};
export const getUserProfile = async (user: Profile) => {
  try {
    if (!user.id) throw new Error("user id must be providet");

    const profile = await User.findById(user.id).lean();
    io.emit("profile", profile)
    return { ...profile };
  } catch (error) {
    console.log(error);
    throw new Error("Can't get user profile");
  }
};
