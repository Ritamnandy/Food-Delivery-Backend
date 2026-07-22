
import mongoose, { Types, type HydratedDocument, Model, Schema } from "mongoose";

interface Iaddress
{
    addressLine: string;
    houseNo?: number;
    street: string;
    city?: string;
    state: string;
    country: string;
    pincode: number;
    isDefault: boolean;
    userId: Types.ObjectId;
}

type AddressDocument = HydratedDocument<Iaddress>;

type AddressModel = Model<Iaddress>;

const addressSchema = new Schema<Iaddress, AddressModel>( {
    addressLine: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    houseNo: {
        type: String,
        trim: true,
        default: null
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
        default: "india"
    },
    pincode: {
        type: Number,
        required: true,
        match: [ /^\d{6}$/, "Invalid pincode" ],
    },
    street: {
        type: String,
        required: true,
        trim: true
    },
    isDefault: {
        type: Boolean,
        required: true,
        default: false
    }

}, { timestamps: true } )


// all index will be unique
addressSchema.index( { userId: 1, isDefault: 1 }, { unique: true } )

const Address = mongoose.model<Iaddress, AddressModel>( "Address", addressSchema );

export { Address }
export type { AddressDocument }