import type { Types } from "mongoose"

interface Ideliverypartner
{
    userId: Types.ObjectId
    vehicleType: string
    vehicleNumber: string
    isAvailable: boolean
    rating: Types.Double
    totalDeliveries: number
}
export type { Ideliverypartner }
