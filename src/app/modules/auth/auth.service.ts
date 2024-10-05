import { IUser, ILoginUser, ILoginUserResponse } from './auth.interface';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import configs from '../../configs';
import { User } from './auth.model';

export const register = async (userData: IUser): Promise<IUser> => {
    const hashedPassword = await hash(userData.password, 10);
    const newUser = new User({
        ...userData,
        password: hashedPassword
    });
    return await newUser.save();
};

export const login = async (loginData: ILoginUser): Promise<ILoginUserResponse> => {
    const user = await User.findOne({ email: loginData.email });
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await compare(loginData.password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const accessToken = sign(
        { id: user._id, email: user.email, role: user.role },
        configs.access_token_secret as string,
        { expiresIn: configs.access_token_expires_in }
    );

    const { password, ...userWithoutPassword } = user.toObject();
    return {
        accessToken,
        user: userWithoutPassword
    };
};

export const forgotPassword = async (email: string): Promise<void> => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    // Generate a password reset token
    const resetToken = sign(
        { id: user._id },
        configs.reset_token_secret as string,
        { expiresIn: '1h' }
    );

    // TODO: Send reset token to user's email
    console.log(`Reset token for ${email}: ${resetToken}`);
};

export const changePassword = async (userId: string, oldPassword: string, newPassword: string): Promise<void> => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await compare(oldPassword, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid old password');
    }

    const hashedNewPassword = await hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();
};

