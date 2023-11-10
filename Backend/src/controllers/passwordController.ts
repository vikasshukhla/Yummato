import { Body, Controller, Route, Patch } from "@tsoa/runtime";
import { emailTrigger, passwordUpdate } from "../interfaces/user";
import { User } from "../models/mongodb.model";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";

const domain = "sandbox6e15657e8ce342169aa8cffb9d81d803.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY!, domain: domain });

@Route("forgot-password")
export class ForgotPassword extends Controller {
  @Patch()
  public async forgetPassword(@Body() patchRequestBody: emailTrigger) {
    try {
      // check if the user exists
      const { email } = patchRequestBody;
      const userData = await User.findOne({ email });
      if (userData) {
        const token = jwt.sign(
          { _id: userData.id },
          process.env.RESET_PASSWORD_KEY!,
          { expiresIn: "20m" }
        );
        const data = {
          from: "noreply@yummato.com",
          to: email,
          subject: "Account Password Reset",
          html: `
                <h2>Please click on given link to reset your password</h2>
                <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
            `,
        };
        try {
          const updateResetLink = await userData.updateOne({
            resetLink: token,
          });
          const res = "Email has been sent, kindly follow the instructions";
          try {
            mg.messages().send(data);
            return {
              message: res,
            };
          } catch (error: any) {
            return { error: error.message };
          }
        } catch (err) {
          this.setStatus(400);
          return { error: "Reset password link error" };
        }
      } else {
        this.setStatus(400);
        return { error: "User with this email doesn't exist" };
      }
    } catch (error) {
      return { errorMessage: error };
    }
  }
}

@Route("reset-password")
export class ResetPassword extends Controller {
  @Patch()
  public async resetPassword(@Body() patchRequestBody: passwordUpdate) {
    const { resetLink, newPass } = patchRequestBody;

    if (resetLink) {
      try {
        jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY!);
        try {
          const userData = await User.findOne({ resetLink });
          if (userData) {
            const obj = {
              password: newPass,
              resetLink: "",
            };
            try {
              const updatePass = await userData.updateOne(obj);
              const res = "Your password has been changed";
              this.setStatus(200);
              return { message: res };
            } catch (err) {
              this.setStatus(400);
              err = "Reset password error";
              return { error: err };
            }
          } else {
            this.setStatus(400);
            return { error: "User with this resetLink doesn't exist" };
          }
        } catch (error) {
          this.setStatus(400);
          error = "User with this token does not exist";
          return { error: error };
        }
      } catch (error) {
        this.setStatus(401);
        error = "Incorret token or it is expired";
        return { error: error };
      }
    } else {
      this.setStatus(401);
      return { error: "Authentication error!!!" };
    }
  }
}
