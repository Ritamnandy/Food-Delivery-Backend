
import { z } from "zod";


const useraddressSchema = z.object( {
    addressLine: z
        .string()
        .trim(),
    houseNo: z
        .number()
        .optional(),
    street: z
        .string()
        .trim(),
    city: z
        .string()
        .trim()
        .optional(),
    state: z
        .string()
        .trim(),
    country: z
        .string()
        .trim(),
    pincode: z
        .number(),
    isDefault: z
        .boolean(),        
} )


export
{
    useraddressSchema
}