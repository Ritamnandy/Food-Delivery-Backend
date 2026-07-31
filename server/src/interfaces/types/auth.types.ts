import type { Types } from "mongoose"


interface GetToken
{
    accessToken: string,
    refreshToken: string
}
interface RegisterBody
{
    firstName: string,
    lastName: string,
    email: string,
    phoneno: string,
    password: string,
}
interface VerificationBody
{
    email: string,
    token: string
}
interface forgetPasswordBody
{
    email: string
}
interface LoginBody
{
    email: string,
    password: string
}
interface ResetpasswordBody
{
    email: string,
    token: string,
    password: string
}



export type {
    RegisterBody,
    VerificationBody,
    LoginBody, GetToken,
    forgetPasswordBody,
    ResetpasswordBody,
}