
import type { UserDocument } from "../../models/index.js"
import type { GetToken,Iuser } from "../../interfaces/index.js"
import {Types} from "mongoose";

interface IUserRepository
{
    getUserById: ( id: Types.ObjectId ) => Promise<UserDocument | null>
    getUserByEmail: ( email: string ) => Promise<UserDocument | null>
    createUser: ( user: Partial<Iuser> ) => Promise<UserDocument | null>
    generateTokenPair: ( user: UserDocument ) => Promise<GetToken | null>
    isPasswordCorrect: ( user: UserDocument, password: string ) => Promise<boolean>
    logout: ( user: UserDocument ) => Promise<void>
    setUserPassword: ( user: UserDocument, password: string ) => Promise<void>
}

export type { IUserRepository }