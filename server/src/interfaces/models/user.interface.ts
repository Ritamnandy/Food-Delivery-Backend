import type { Login_Type, User_Roles } from "../../constants.js"

interface Iuser
{
    firstName: string,
    lastName: string,
    email: string,
    phoneno: string,
    password: string,
    role: User_Roles,
    loginType: Login_Type
    isVerified: boolean
    googleId?: string
    avatar?: string
    avatarId?: string
    refreshToken?: string
}

interface IuserMethods
{
    generateAccessToken: () => string,
    generateRefreshToken: () => string,
    comparePassword: ( password: string ) => Promise<boolean>,
    getPhoneNo: () => string
}

export type { Iuser, IuserMethods }