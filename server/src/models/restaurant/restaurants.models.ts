

import mongoose, { Types, type HydratedDocument, Model, Schema } from "mongoose";



interface Irestaurant
{
    ownerId: Types.ObjectId
    name: string
    description: string
    logo: symbol
    banner?: symbol
    phone: string[]
    email: string
    openingTime: Date
    closingTime: Date
    isOpen: boolean
    rating: Types.Double
    address: IrestaurantAddress
}

type restaurantModel = Model<Irestaurant>

interface IrestaurantAddress
{
    building?: string;
    addressLine: string;
    street: string;
    state: string;
    city?: string;
    country: string;
    pincode: number;
}
type restaurantAddressModel = Model<IrestaurantAddress>

const restaurantAddressSchema = new Schema<IrestaurantAddress, restaurantAddressModel>( {
    building: {
        type: String,
        trim: true,
        default: null
    },
    addressLine: {
        type: String,
        required: true,
        trim: true
    },
    street: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        default: null,
        trim: true,
        lowercase: true
    },
    state: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    country: {
        type: String,
        enum: [ "india" ],
        default: "india",
    },
    pincode: {
        type: Number,
        required: true,
        match: [ /^\d{6}$/, "Invalid pincode" ],
    }
}, {
    _id: false,
    id: false,
    timestamps: false
} )

type ResturantDocument = HydratedDocument<Irestaurant>

const restaurantSchema = new Schema<Irestaurant, restaurantModel>( {
    ownerId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 300
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: [
        {
            type: String,
            required: true,
            trim: true,
            unique: true,
            maxLength: 10,
            match: [ /^[6-9]\d{9}$/, "Please enter a valid mobile number" ],
        }
    ],
    openingTime: {
        type: Date,
        required: true,
    },
    closingTime: {
        type: Date,
        required: true,
    },
    isOpen: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Types.Double,
        default: 0
    },
    address: {
        type: restaurantAddressSchema,
        required: true
    },
    logo: {
        type: String,
        trim: true,
        default: null
    },
    banner: {
        type: String,
        trim: true,
        default: null
    }
}, { timestamps: true } )


restaurantSchema.index( { email: 1 }, { unique: true } )


const Restaurant = mongoose.model<Irestaurant, restaurantModel>( "Restaurant", restaurantSchema )

export type { ResturantDocument }
export { Restaurant }