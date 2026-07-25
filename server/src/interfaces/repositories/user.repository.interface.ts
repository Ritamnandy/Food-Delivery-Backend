
import type { UserDocument } from "../../models/index.js"

interface IUserRepository
{
    getUserByEmail: ( email: string ) => Promise<UserDocument | null>
    createUser: ( user: Partial<UserDocument> ) => Promise<UserDocument | null>
}

export type { IUserRepository }