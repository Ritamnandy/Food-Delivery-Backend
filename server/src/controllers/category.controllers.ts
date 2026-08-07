
import { categoryServices } from '../services/category.services.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';


const createCategoryController = asyncHandler( async ( req: Request, res: Response ) =>
{
    const data = await categoryServices.createCategory( req.body );
    return res.status( 201 ).json( ApiResponse.created( "Category created successfully", data ) );
} )


const updateCategoryController = asyncHandler( async ( req: Request, res: Response ) =>
{
    const data = await categoryServices.updateCategory( req.params.id as string, req.body );
    return res.status( 200 ).json( ApiResponse.ok( "Category updated successfully", data ) );
} )


const deleteCategoryController = asyncHandler( async ( req: Request, res: Response ) =>
{
    const data = await categoryServices.deleteCategory( req.params.id as string );
    return res.status( 200 ).json( ApiResponse.ok( "Category deleted successfully", "" ) );
} )

const getAllCategoriesController = asyncHandler( async ( req: Request, res: Response ) =>
{
    const data = await categoryServices.getAllCategories();
    return res.status( 200 ).json( ApiResponse.ok( "Categories found successfully", data ) );
} )


export
{
    createCategoryController,
    updateCategoryController,
    deleteCategoryController,
    getAllCategoriesController
}