import type { CategoryDocument } from "../../models/index.js";
import type { Icategory } from "../models/models.interface.js";

interface ICategoryRepository
{
    getAll: () => Promise<CategoryDocument[] | []>;
    getOne: ( id: string ) => Promise<CategoryDocument | null>;
    create: ( category: Icategory ) => Promise<CategoryDocument>;
    delete: ( id: string ) => Promise<CategoryDocument | null>;
    update: ( id: string, category: Partial<Icategory> ) => Promise<CategoryDocument | null>;
}

export type { ICategoryRepository }