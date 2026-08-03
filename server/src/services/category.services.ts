
import type { ICategoryRepository, Icategory } from "../interfaces/index.js";
import type { CategoryDocument } from "../models/index.js";
import { categoryRepository } from "../repositories/category.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";


class CategoryServices
{
    constructor ( private readonly categoryRepository: ICategoryRepository ) { }

    async createCategory ( category: Icategory ): Promise<CategoryDocument>
    {
        const newCategory = await this.categoryRepository.create( category )
        if ( !newCategory )
        {
            throw ApiError.badRequest( "Category not created", [ "Invalid category data" ] )
        }
        return newCategory
    }

    async updateCategory ( id: string, category: Partial<Icategory> ): Promise<CategoryDocument>
    {
        const updatedCategory = await this.categoryRepository.update( id, category )
        if ( !updatedCategory )
        {
            throw ApiError.badRequest( "Category not updated", [ "Invalid category data" ] )
        }
        return updatedCategory
    }

    async deleteCategory ( id: string ): Promise<CategoryDocument>
    {
        const deletedCategory = await this.categoryRepository.delete( id )
        if ( !deletedCategory )
        {
            throw ApiError.badRequest( "Category not deleted", [ "Invalid category data" ] )
        }
        return deletedCategory
    }

    async getAllCategories (): Promise<CategoryDocument[]>
    {
        const categories = await this.categoryRepository.getAll()
        if ( !categories || categories.length === 0 )
        {
            throw ApiError.badRequest( "Categories not found", [ "Invalid category data" ] )
        }
        return categories
    }

}


export const categoryServices = new CategoryServices( categoryRepository )