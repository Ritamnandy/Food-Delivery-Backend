
import type { ICategoryRepository, Icategory } from "../interfaces/index.js";
import { Category, type CategoryDocument } from "../models/index.js";

class CategoryRepository implements ICategoryRepository
{
    async create ( category: Partial<Icategory> ): Promise<CategoryDocument>
    {
        return Category.create( category )

    }
    async update ( id: string, category: Partial<Icategory> ): Promise<CategoryDocument | null>
    {
        return Category.findByIdAndUpdate( id, category, { new: true } )
    }
    async delete ( id: string ): Promise<CategoryDocument | null>
    {
        return Category.findByIdAndDelete( id )
    }
    async getAll (): Promise<CategoryDocument[]>
    {
        return Category.find()
    }
    async getOne ( id: string ): Promise<CategoryDocument | null>
    {
        return Category.findById( id )
    }
}

export const categoryRepository = new CategoryRepository()