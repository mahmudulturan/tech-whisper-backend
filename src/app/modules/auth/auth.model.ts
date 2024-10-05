import { Schema, model, Document } from 'mongoose';
import { IUser } from './auth.interface';

const userSchema = new Schema<IUser & Document>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
});

export const User = model<IUser & Document>('User', userSchema);
