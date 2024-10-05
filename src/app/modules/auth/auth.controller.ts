import { Request, Response } from 'express';
import * as authService from './auth.service';
import { IUser, ILoginUser } from './auth.interface';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const userData: IUser = req.body;
        const newUser = await authService.register(userData);
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: newUser
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to register user',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const loginData: ILoginUser = req.body;
        const loginResponse = await authService.login(loginData);
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: loginResponse
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Failed to login',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;
        await authService.forgotPassword(email);
        res.status(200).json({
            success: true,
            message: 'Password reset instructions sent to email'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to process forgot password request',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const changePassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, oldPassword, newPassword } = req.body;
        await authService.changePassword(userId, oldPassword, newPassword);
        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to change password',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

