

import mongoose, { Schema } from "mongoose";
import { hashPassword, checkPw } from "../utils";
import DogModel from "./dog.model";

interface User {
    firstName: string
    lastName: string
    email: string
    password: string
    tel: number
    experience: string
    aboutYou: string
    dogs: Array<typeof DogModel | string>
    comparePassword :(otherPass: string) => boolean
}

const UserSchema = new mongoose.Schema<User>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dogs: [{type: Schema.Types.ObjectId, ref: "dogs"}],
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tel:{type:Number,required:true},
    experience: { type: String, required: true },
    aboutYou: { type: String, required: true }
})
UserSchema.pre('save', function () {
    if (this.isModified("password")) {
        this.password = hashPassword(this.password)
    }
})

UserSchema.methods.comparePassword = function (passOther: string) {
    return checkPw(this.password, passOther)
}

const UserModel = mongoose.model("users", UserSchema)

export default UserModel