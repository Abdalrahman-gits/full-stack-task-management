import mongoose, { type HydratedDocument } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

export interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string | undefined;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: 3,
    maxLength: 100,
  },
  email: {
    type: String,
    unique: true,
    lowerCase: true,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Email is not valid"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    validate: [
      (val: string) => validator.isMobilePhone(val, "ar-EG"),
      "Phone number is not valid",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Password confirmation is required"],
    validate: {
      validator: function (this: { password: string }, val: string) {
        return this.password === val;
      },
      message: "Password confirmation must be equal to password",
    },
  },
});

export type IUserDocument = HydratedDocument<IUser>;

userSchema.pre("save", async function (this: IUserDocument) {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);

  this.passwordConfirm = undefined;
});

const User = mongoose.model("User", userSchema);

export default User;
