export interface IUser {
    id?: string;
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface ILoginUserResponse {
    accessToken: string;
    refreshToken?: string;
    user: Omit<IUser, 'password'>;
}

export interface IRefreshTokenResponse {
    accessToken: string;
}
