
import { User, type UserDocument } from "../models/index.js";
import { Types } from "mongoose";
import type { IUserRepository, GetToken,Iuser } from "../interfaces/index.js";
class UserRepository implements IUserRepository
{
    public async getUserById ( id: Types.ObjectId ): Promise<UserDocument | null>
    {
        return await User.findById( id ).exec()
    }
    public async getUserByEmail ( email: string ): Promise<UserDocument | null>
    {
        return await User.findOne( { email } ).exec()
    }

    public async createUser ( user: Partial<Iuser> ): Promise<UserDocument | null>
    {
        return await User.create( {
            ...user,
            isVerified: true
        } )
    }
    public async generateTokenPair ( user: UserDocument ): Promise<GetToken | null>
    {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save( { validateBeforeSave: false } );
        return { accessToken, refreshToken }
    }
    public async isPasswordCorrect ( user: UserDocument, password: string ): Promise<boolean>
    {
        return await user.comparePassword( password );
    }
    public async logout ( user: UserDocument ): Promise<void>
    {
        user.refreshToken = "";
        await user.save();
    }
    public async setUserPassword ( user: UserDocument, password: string ): Promise<void>
    {
        user.password = password;
        await user.save();
    }
}


export const authRepository = new UserRepository()