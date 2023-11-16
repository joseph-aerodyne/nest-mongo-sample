import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps:true
})

export class User {

    _id: mongoose.Types.ObjectId;

    @Prop()
    name : string;

    @Prop({
        type: String, required: true, unique: true 
    })
    email: string;

    @Prop()
    password : string;

    @Prop()
    age : number;

    @Prop()
    city: string;

    @Prop()
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);


