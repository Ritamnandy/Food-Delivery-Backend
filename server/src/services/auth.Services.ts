
import type {
    ICacheRepository, IEmailQueueRepository,
    IUserRepository, RegisterBody, VerificationBody,
    GetToken, LoginBody, forgetPasswordBody, ResetpasswordBody
} from "../interfaces/index.js";
import
{
    cacheRepository,
    authRepository,
    emailQueueRepository
} from "../repositories/index.js";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";
import { signupKey, otpKey, getOtp, resendCoolDownKey, hashToken, resetCooldownKey, rowToken, resetKey, getUserKey } from "../constants.js";
import type { UserDocument, RefreshTokenPayload } from "../models/index.js";
import Jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import type { Types } from "mongoose";
const OTP_TTL = 10 * 60
const SIGNUP_DATA_TTL = 30 * 60


class AuthServices
{
    constructor (
        private readonly cacheRepository: ICacheRepository,
        private readonly authRepository: IUserRepository,
        private readonly emailQueueRepository: IEmailQueueRepository
    ) { }
    private async getTokens ( user: UserDocument ): Promise<GetToken | undefined>
    {
        try
        {
            const Tokens = await this.authRepository.generateTokenPair( user )
            if ( !Tokens?.accessToken || !Tokens?.refreshToken )
            {
                logger.error( "Error generating token pair", {
                    userId: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                } );
                return undefined
            }
            return Tokens
        } catch ( error )
        {
            logger.error( "Error generating token pair", {
                error: ( error as Error ).message,
                stack: ( error as Error ).stack,
            } );
            return undefined

        }

    }
    async register ( body: RegisterBody )
    {
        const { firstName, lastName, email } = body;
        const existingUser = await this.authRepository.getUserByEmail( email );
        if ( existingUser )
        {
            logger.warn( "Register attempt with existing email", { email } );
            throw new ApiError( 400, "User already exists", [ "User already exists" ] );
        }

        const otpCode = getOtp();

        const userName = `${ firstName } ${ lastName }`;

        Promise.all( [
            this.cacheRepository.set( otpKey( email ), otpCode, OTP_TTL ),

            this.cacheRepository.set( signupKey( email ), JSON.stringify( body ), SIGNUP_DATA_TTL ),

            this.emailQueueRepository.VerificationMail( { email, userName, token: otpCode } )
        ] )

        logger.info( "Register OTP issued", { email } );
    }
    async reSendCode ( email: string )
    {
        const onCoolDown = await this.cacheRepository.get( resendCoolDownKey( email ) );
        if ( onCoolDown )
        {
            logger.warn( "Resend code attempt on cooldown", { email } );
            throw new ApiError( 429, "Please wait before requesting another code", [ "Please wait before requesting another code" ] );
        }
        const userData = await this.cacheRepository.get( signupKey( email ) );
        if ( !userData )
        {
            logger.warn( "Resend code attempt with invalid email", { email } );
            throw new ApiError( 400, "Verification session expired or invalid email", [ "Invalid email" ] );
        }
        const { firstName, lastName } = JSON.parse( userData as string ) as RegisterBody;

        const userName = `${ firstName } ${ lastName }`;
        const otpCode = getOtp();

        Promise.all( [
            this.cacheRepository.set( otpKey( email ), otpCode, OTP_TTL ),

            this.cacheRepository.keepAlive( signupKey( email ), SIGNUP_DATA_TTL ),

            this.cacheRepository.set( resendCoolDownKey( email ), 'true', 60 * 2 ),

            this.emailQueueRepository.VerificationMail( { email, userName, token: otpCode } )
        ] )

        logger.info( "Resend code OTP issued", { email } );
    }
    async verifyEmail ( body: VerificationBody ): Promise<object>
    {
        const { email, token } = body;

        const cachedOtp = await this.cacheRepository.get( otpKey( email ) );
        if ( !cachedOtp )
        {
            throw new ApiError( 400, "otp expired", [ "please sign up again" ] );
        }
        if ( cachedOtp !== token )
        {
            throw new ApiError( 400, "Invalid verification code", [ "Invalid verification code" ] );
        }
        const cachedData = await this.cacheRepository.get( signupKey( email ) );

        if ( !cachedData )
        {
            throw new ApiError( 400, "verification session expired", [ "please sign up again" ] );
        }
        const data = JSON.parse( cachedData );
        const createdUser: UserDocument | null = await this.authRepository.createUser( data );
        if ( !createdUser )
        {
            logger.error( "User creation failed", { email } );
            throw new ApiError( 500, "User creation failed", [ "User creation failed" ] );
        }

        const Token: GetToken | undefined = await this.getTokens( createdUser );

        if ( !Token?.accessToken || !Token?.refreshToken )
        {
            logger.error( "Token generation failed", { email } );
            throw new ApiError( 500, "Token generation failed", [ "Token generation failed" ] );
        }
        const { password, googleId, avatarId, loginType, phoneno, refreshToken, ...user } = createdUser.toObject();

        await Promise.all( [
            this.cacheRepository.delete( otpKey( email ) ),
            this.cacheRepository.delete( signupKey( email ) ),
            this.cacheRepository.delete( resendCoolDownKey( email ) )
        ] );

        return { accessToken: Token.accessToken, refreshToken: Token.refreshToken, ...user }
    }

    async loginUser ( body: LoginBody ): Promise<object>
    {
        const { email, password } = body;
        const user = await this.authRepository.getUserByEmail( email );
        if ( !user )
        {
            logger.warn( "Login attempt with invalid email", { email } );
            throw new ApiError( 404, "User not found", [ "User not found" ] );
        }
        const isPasswordCorrect = await this.authRepository.isPasswordCorrect( user, password );
        if ( !isPasswordCorrect )
        {
            logger.warn( "Login attempt with invalid password", { email } );
            throw new ApiError( 400, "Invalid password", [ "Invalid password" ] );
        }
        const Token: GetToken | undefined = await this.getTokens( user );
        if ( !Token?.accessToken || !Token?.refreshToken )
        {
            logger.error( "Token generation failed", { email } );
            throw new ApiError( 500, "Token generation failed", [ "Token generation failed" ] );
        }
        const { password: _, googleId, avatarId, loginType, phoneno, refreshToken, isVerified, ...userData } = user.toObject();

        return { accessToken: Token.accessToken, refreshToken: Token.refreshToken, ...userData }
    }

    async logoutUser ( user: UserDocument )
    {
        await this.authRepository.logout( user );
    }
    async refreshAccessToken ( token: string )
    {
        try
        {
            const decodedToken: RefreshTokenPayload = Jwt.verify( token, process.env.REFRESH_TOKEN_SECRET as string ) as RefreshTokenPayload;
            const user: UserDocument | null = await this.authRepository.getUserById( decodedToken?.id );
            if ( !user )
            {
                throw new ApiError( 404, "User not found", [ "User not found" ] );
            }
            const Token: GetToken | undefined = await this.getTokens( user );
            if ( !Token?.accessToken || !Token?.refreshToken )
            {
                throw new ApiError( 500, "Token generation failed", [ "Token generation failed" ] );
            }
            return { accessToken: Token.accessToken, refreshToken: Token.refreshToken }
        } catch ( error )
        {
            logger.error( "Error refreshing access token", { error: ( error as Error ).message } );
            throw new ApiError( 500, "Error refreshing access token", [ ( error as Error ).message ] );
        }
    }

    async forgetPassword ( body: forgetPasswordBody )
    {
        const { email } = body;
        const onCooldown = await this.cacheRepository.get( resetCooldownKey( email ) );
        if ( onCooldown )
        {
            logger.warn( "Forget password attempt on cooldown", { email } );
            throw new ApiError( 429, "Please wait before  another requesting", [ "Please wait before  another requesting" ] );
        }
        const user = await this.authRepository.getUserByEmail( email );
        if ( !user )
        {
            logger.warn( "Forget password attempt with invalid email", { email } );
            throw new ApiResponse(
                200,
                "If an account exists with this email, a password reset link has been sent.",
                {}
            );
        }
        if ( !user.isVerified )
        {
            logger.warn( "Forget password attempt with unverified email", { email } );
            throw new ApiResponse(
                200,
                "If an account exists with this email, a password reset link has been sent.",
                {}
            )
        }
        const token = rowToken();
        const hastoken = hashToken( token );
        const link = `${ process.env.CLIENT_URL as string }?token=${ token }&email=${ email }`

        Promise.all( [
            this.cacheRepository.set( resetKey( hastoken ), email, 60 * 15 ),

            this.cacheRepository.set( resetCooldownKey( email ), 'true', 60 * 2 ),

            this.emailQueueRepository.ForgetPasswordMail( { email, userName: user.firstName, link } )
        ] )

        logger.info( "Password reset link issued", { userId: user._id } );
    }

    async resetPassWord ( body: ResetpasswordBody )
    {
        const { email, token, password } = body;
        const hashtoken = hashToken( token );
        const cachedEmail = await this.cacheRepository.get( resetKey( hashtoken ) );
        if ( !cachedEmail )
        {
            logger.warn( "Reset password attempt with invalid token", { email } );
            throw new ApiError( 404, "Invalid token", [ "Invalid token" ] );
        }
        const user = await this.authRepository.getUserByEmail( cachedEmail );
        if ( !user || user.email !== email )
        {
            logger.warn( "Reset password attempt with invalid user", { email } );
            throw new ApiError( 404, " user not found", [ "Invalid user or user not found" ] );
        }
        this.authRepository.setUserPassword( user, password );
        await this.cacheRepository.delete( resetKey( hashtoken ) );
        await this.cacheRepository.delete( resetCooldownKey( email ) );
        await this.emailQueueRepository.PasswordChangedMail( { email, userName: `${ user.firstName } ${ user.lastName }` } );
        logger.info( "Password reset successful", { userId: user._id } );

    }

    async userDetails ( user: UserDocument ): Promise<Partial<UserDocument>>
    {
        if ( !user )
        {
            throw new ApiError( 404, "User not found", [ "User not found" ] );
        }
        const cachedUser = await this.cacheRepository.get( getUserKey( user.email ) );

        if ( cachedUser )
        {
            return JSON.parse( cachedUser )
        }
        const { password, googleId, avatarId, loginType, phoneno, refreshToken, isVerified, ...rest } = user.toObject();
        await this.cacheRepository.set( getUserKey( user.email ), JSON.stringify( rest ), 60 * 10 );
        return rest
    }


}



export const authServices = new AuthServices(
    cacheRepository,
    authRepository,
    emailQueueRepository );