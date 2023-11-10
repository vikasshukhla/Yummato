import { Body, Controller, Post, Route } from "@tsoa/runtime";
import { UserLogin, userRegister } from "../interfaces/user";
import { User } from "../models/mongodb.model";

@Route("login")
export class Userlogin extends Controller {
  @Post()
  public async userLogin(@Body() user: UserLogin) {
    try {
      // check if the user exists
      const userData = await User.findOne({ email: user.email });
      if (userData) {
        //check if password matches
        let isAdmin = false;
        userData.email === "test@bahadur.com" ? (isAdmin = true) : isAdmin;
        const result = user.password === userData.password;
        if (result) {
          return {
            message: "Login Success",
            data: { name: userData.name, email: userData.email , isAdmin: isAdmin},
          };
        } else {
          this.setStatus(400);
          return { error: "Incorrect Password" };
        }
      } else {
        this.setStatus(400);
        return { error: "User doesn't exist" };
      }
    } catch (error) {
      return { errorMessage: error };
    }
  }
}

@Route("register")
export class UserRegister extends Controller {
  @Post()
  public async userRegister(@Body() user: userRegister) {
    try {
      const userData = await User.findOne({ email: user.email });
      if (userData) {
        this.setStatus(409);
        return { message: "User already exist" };
      }
      const newUser = new User({
        name: user.name,
        email: user.email,
        password: user.password,
      });

      await newUser.save();
      this.setStatus(201);
      return { message: "account created successfully" };
    } catch (error) {
      return { errorMessage: error };
    }
  }
}
