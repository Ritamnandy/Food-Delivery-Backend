
import type { IFoodItemRepository, FoodItemBody } from "../interfaces/index.js";
import { FoodItem, type FoodItemDocument } from "../models/index.js";

class FoodItemRepository implements IFoodItemRepository
{
    async createFoodItem ( foodItem: FoodItemBody ): Promise<FoodItemDocument>
    {
        return await FoodItem.create( foodItem );
    }
    async getFoodItems (): Promise<FoodItemDocument[] |[]>
    {
        return await FoodItem.find();
    }
    async getFoodItem ( foodItemId: string ): Promise<FoodItemDocument | null>
    {
        return await FoodItem.findById( foodItemId );
    }
    async updateFoodItem ( foodItemId: string, foodItem: Partial<FoodItemBody> ): Promise<FoodItemDocument | null>
    {
        return await FoodItem.findByIdAndUpdate( foodItemId, foodItem, { new: true } );
    }
    async deleteFoodItem ( foodItemId: string ): Promise<FoodItemDocument | null>
    {
        return await FoodItem.findByIdAndDelete( foodItemId );
    }
}

export const foodItemRepository = new FoodItemRepository()