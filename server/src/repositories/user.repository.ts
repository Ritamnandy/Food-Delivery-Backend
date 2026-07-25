
import { User, type UserDocument } from "../models/index.js";
import type { IUserRepository } from "../interfaces/repositories/user.repository.interface.js";
class UserRepository implements IUserRepository
{
    public async getUserByEmail ( email: string ): Promise<UserDocument | null>
    {
        return User.findOne( { email } ).exec()
    }

    public async createUser ( user: Partial<UserDocument> ): Promise<UserDocument | null>
    {
        return User.create( user )
    }
}


export const authRepository = new UserRepository()