
import mongoose, { Types, type HydratedDocument, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { type SignOptions, type Secret, type JwtPayload } from "jsonwebtoken";
import { User_Roles, Login_Type } from "../constants.js";
import crypto from "crypto"

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

type UserDocument = HydratedDocument<Iuser, IuserMethods>

type UserModel = Model<Iuser, {}, IuserMethods>

const userSchema = new Schema<Iuser, UserModel, IuserMethods>( {
    firstName: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phoneno: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
        required: function ()
        {
            return this.loginType === Login_Type.EMAIL_PASSWORD
        }
    },
    role: {
        type: String,
        required: true,
        enum: User_Roles,
        default: User_Roles.CUSTOMER
    },
    loginType: {
        type: String,
        required: true,
        enum: Login_Type,
        default: Login_Type.EMAIL_PASSWORD
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    googleId: {
        type: String,
        trim: true,
        required: function ()
        {
            return this.loginType === Login_Type.GOOGLE
        },
        default: null
    },
    avatar: {
        type: String,
        trim: true,
        default: null
    },
    avatarId: {
        type: String,
        trim: true,
        default: null
    },
    refreshToken: {
        type: String,
        trim: true,
        default: null
    }
}, { timestamps: true } )

// all index will be here
userSchema.index( { email: 1 }, { unique: true } )
userSchema.index( { phoneno: 1 }, { unique: true, sparse: true } )




userSchema.pre( "save", async function ()
{
    if ( !this.isModified( "password" ) ) return

    this.password = await bcrypt.hash( this.password, Number( process.env.BCRYPT_SALT_ROUNDS as string ) )

} )

const algorithm: string = process.env.ENCRYPTION_ALGORITHM as string;
const key: string = process.env.ENCRYPTION_KEY as string;
const iv: string = process.env.ENCRYPTION_IV as string;

userSchema.pre( "save", async function ()
{
    if ( !this.isModified( "phoneno" ) ) return
    const cipher = crypto.createCipheriv( algorithm, key, iv );
    let encrypted = cipher.update( this.password, "utf8", "hex" )
    encrypted += cipher.final( "hex" );
    this.phoneno = encrypted

} )

userSchema.methods.getPhoneNo = function (): string
{
    const decipher = crypto.createDecipheriv( algorithm, key, iv );
    let decrypted = decipher.update( this.phoneno, "hex", "utf8" );
    decrypted += decipher.final( "utf8" );
    return decrypted
}


userSchema.methods.comparePassword = async function ( password: string ): Promise<boolean>
{
    return await bcrypt.compare( password, this.password )
}

const jwtSecret = process.env.JWT_TOKEN_SECRET as string
const jwtExpiresIn = process.env.JWT_TOKEN_EXPIRES_IN as string

if ( !jwtSecret )
{
    throw new Error( "JWT_TOKEN_SECRET is not defined" )
}

if ( !jwtExpiresIn )
{
    throw new Error( "JWT_TOKEN_EXPIRES_IN is not defined" )
}
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string
const refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN as string
if ( !refreshTokenSecret )
{
    throw new Error( "REFRESH_TOKEN_SECRET is not defined" )
}
if ( !refreshTokenExpiresIn )
{
    throw new Error( "REFRESH_TOKEN_EXPIRES_IN is not defined" )
}


interface RefreshTokenPayload
{
    id: Types.ObjectId
    role: User_Roles,
    email: string
}

interface AccessTokenPayload extends RefreshTokenPayload
{
    firstName: string
    lastName: string
    loginType: Login_Type
    isVerified: boolean

}

userSchema.methods.generateAccessToken = function (): string
{
    const payload: AccessTokenPayload = {
        id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        role: this.role,
        loginType: this.loginType,
        isVerified: this.isVerified
    }
    return jwt.sign( payload as JwtPayload, jwtSecret as Secret, { expiresIn: jwtExpiresIn } as SignOptions )
}

userSchema.methods.generateRefreshToken = function (): string
{
    const payload: RefreshTokenPayload = {
        id: this._id,
        role: this.role,
        email: this.email
    }
    return jwt.sign( payload as JwtPayload, refreshTokenSecret as Secret, { expiresIn: refreshTokenExpiresIn } as SignOptions )
}

const User = mongoose.model<Iuser, UserModel>( "User", userSchema )

export { User }
export type {
    UserDocument,
    AccessTokenPayload,
    RefreshTokenPayload
}