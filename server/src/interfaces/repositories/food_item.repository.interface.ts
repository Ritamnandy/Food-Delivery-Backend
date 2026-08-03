
import type { FoodItemBody} from "../index.js";
import type { FoodItemDocument } from "../../models/index.js";

interface IFoodItemRepository
{
    createFoodItem: ( foodItem: FoodItemBody ) => Promise<FoodItemDocument>;
    getFoodItems: () => Promise<FoodItemDocument[] | []>;
    getFoodItem: ( foodItemId: string ) => Promise<FoodItemDocument | null>;
    updateFoodItem: ( foodItemId: string, foodItem: Partial<FoodItemBody> ) => Promise<FoodItemDocument | null>;
    deleteFoodItem: ( foodItemId: string ) => Promise<FoodItemDocument | null>;
}

export type { IFoodItemRepository };