
import type { FoodItemBody, IFoodItemRepository } from "../interfaces/index.js";
import { foodItemRepository } from "../repositories/index.js";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";


class FoodItemServices
{
    constructor ( private readonly foodItemRepository: IFoodItemRepository ) { }
    async createFoodItem ( foodItem: FoodItemBody )
    {
        const createdFoodItem = await this.foodItemRepository.createFoodItem( foodItem );
        if ( !createdFoodItem )
        {
            logger.error( "Invalid food item data", { foodItem } );
            throw ApiError.badRequest( "Invalid food item data", [ "Invalid food item data" ] );
        }
    }
    async deleteFoodItem ( id: string )
    {
        const deletedFoodItem = await this.foodItemRepository.deleteFoodItem( id );
        if ( !deletedFoodItem )
        {
            logger.error( "Invalid food item id", { id } );
            throw ApiError.badRequest( "Invalid food item id", [ "Invalid food item id" ] );
        }
    }
    async updateFoodItem ( id: string, foodItem: Partial<FoodItemBody> )
    {
        const updatedFoodItem = await this.foodItemRepository.updateFoodItem( id, foodItem );
        if ( !updatedFoodItem )
        {
            logger.error( "Invalid food item id", { id } );
            throw ApiError.badRequest( "Invalid food item id", [ "Invalid food item id" ] );
        }
    }
    async getFoodItems ()
    {
        const foodItems = await this.foodItemRepository.getFoodItems();
        if ( !foodItems || foodItems.length === 0 )
        {
            logger.error( "No food items found" );
            throw ApiError.badRequest( "No food items found", [ "No food items found" ] );
        }
        return foodItems;
    }
    
}


export const foodItemServices = new FoodItemServices( foodItemRepository )