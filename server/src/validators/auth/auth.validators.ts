
import { z } from "zod";

const registerSchema = z.object( {

    firstName: z
        .string()
        .trim()
        .min( 3, { message: "First name must be at least 3 characters long" } )
        .max( 50, { message: "First name must be at most 50 characters long" } ),
    lastName: z
        .string()
        .trim()
        .min( 3, { message: "Last name must be at least 3 characters long" } )
        .max( 50, { message: "Last name must be at most 50 characters long" } ),
    email: z
        .string()
        .trim()
        .email( { message: "Invalid email address" } )
        .max( 100, { message: "Email must be at most 100 characters long" } ),    
    password: z
        .string()
        .trim()
        .min( 6, { message: "Password must be at least 6 characters long" } )
        .max( 50, { message: "Password must be at most 50 characters long" } )
        .regex( /[A-Z]/, { message: "Password must contain at least one uppercase letter" } )
        .regex( /[a-z]/, { message: "Password must contain at least one lowercase letter" } )
        .regex( /[0-9]/, { message: "Password must contain at least one digit" } )
        .regex( /[^A-Za-z0-9]/, { message: "Password must contain at least one special character" } ),
    phoneNo: z
        .string()
        .trim()
        .regex(/^[0-9]{10}$/, { message: "Phone number must be 10 digits" })
        .min( 10, { message: "Phone number must be 10 digits" } )
        .max( 10, { message: "Phone number must be 10 digits" } ),

} )

const loginSchema = z.object( {
    email: z
        .string()
        .trim()
        .email( { message: "Invalid email address" } )
        .max( 100, { message: "Email must be at most 100 characters long" } ),    
    password: z
        .string()
        .trim()
        .min( 6, { message: "Password must be at least 6 characters long" } )
        .max( 50, { message: "Password must be at most 50 characters long" } )
        .regex( /[A-Z]/, { message: "Password must contain at least one uppercase letter" } )
        .regex( /[a-z]/, { message: "Password must contain at least one lowercase letter" } )
        .regex( /[0-9]/, { message: "Password must contain at least one digit" } )
        .regex( /[^A-Za-z0-9]/, { message: "Password must contain at least one special character" } ),
} )

const verificationSchema = z.object( {
    email: z
        .string()
        .trim()
        .email( { message: "Invalid email address" } )
        .max( 100, { message: "Email must be at most 100 characters long" } ),  
    token: z
        .string()
        .trim()
        .max( 6, { message: "Token must be at most 6 characters long" } ),    
})


const forgetPasswordSchema = z.object( {
    email: z
        .string()
        .trim()
        .email( { message: "Invalid email address" } )
        .max( 100, { message: "Email must be at most 100 characters long" } ),  
} )


const resetpasswordSchema = z.object( {
    email: z
        .string()
        .trim()
        .email( { message: "Invalid email address" } )
        .max( 100, { message: "Email must be at most 100 characters long" } ),  
    token: z
        .string()
        .trim()
        .max( 6, { message: "Token must be at most 6 characters long" } ),    
    password: z
        .string()
        .trim()
        .min( 6, { message: "Password must be at least 6 characters long" } )
        .max( 50, { message: "Password must be at most 50 characters long" } )
        .regex( /[A-Z]/, { message: "Password must contain at least one uppercase letter" } )
        .regex( /[a-z]/, { message: "Password must contain at least one lowercase letter" } )
        .regex( /[0-9]/, { message: "Password must contain at least one digit" } )
        .regex( /[^A-Za-z0-9]/, { message: "Password must contain at least one special character" } ),
})







export
{
    registerSchema,
    loginSchema, verificationSchema,
    forgetPasswordSchema, resetpasswordSchema
}