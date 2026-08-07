

import  z  from "zod";


const restaurantBodySchema = z.object( {
    userId: z
        .string()
        .trim(),
    name: z
        .string()
        .trim()
        .min( 5, { message: "Name must be at least 3 characters long" } )
        .max( 100, { message: "Name must be at most 100 characters long" } ),
    description: z
        .string()
        .trim()
        .min( 10, { message: "Description must be at least 10 characters long" } )
        .max( 1000, { message: "Description must be at most 1000 characters long" } ),
    email: z
        .string()
        .trim()
        .email( { message: "Invalid email address" } )
        .max( 100, { message: "Email must be at most 100 characters long" } ),     
    phone:z
        .string()
        .trim()
        .regex(/^[0-9]{10}$/, { message: "Phone number must be 10 digits" })
        .min( 10, { message: "Phone number must be 10 digits" } )
        .max( 10, { message: "Phone number must be 10 digits" } ),
    openingTime: z.coerce
        .date( { message: "Opening time is required" } ), 
    closingTime: z.coerce
        .date( { message: "Closing time is required" } ),
    isOpen: z
        .boolean( { message: "Is open must be a boolean type " } ),        
} )


const restaurantAddressBodySchema = z.object( {

    building: z
        .string()
        .trim()
        .optional(),
    addressLine: z
        .string()
        .trim(),    
    street: z
        .string()
        .trim(),
    city: z
        .string()
        .trim(),
    state: z
        .string()
        .trim(),
    country: z
        .string()
        .trim(),
    pincode: z
        .string()
        .trim()
        .regex(/^[0-9]{6}$/, { message: "Pincode must be 6 digits" })
        .min( 6, { message: "Pincode must be 6 digits" } )
        .max( 6, { message: "Pincode must be 6 digits" } ),


} )


export
{
    restaurantBodySchema,
    restaurantAddressBodySchema
}