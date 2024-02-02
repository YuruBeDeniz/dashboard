import { Schema, model } from 'mongoose';
interface IUser {
    _id: string;
    name: string;
    password: string;
    email: string;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "Please provide name!"],
        },
        password: {
            type: String,
            minlength: 4,
            required: [true, "Please provide password!"],
        },
        email: {
            type: String,
            unique: true,
        }
    },
    {
        timestamps: true,
    } 
);

const User = model<IUser>('User', userSchema);

export default User;
