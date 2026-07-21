
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { logger } from './logger.js';

const name: string = process.env.CLOUDINARY_CLOUD_NAME as string
const apiKey: string = process.env.CLOUDINARY_API_KEY as string
const apiSecret: string = process.env.CLOUDINARY_API_SECRET as string


cloudinary.config( {
    cloud_name: name,
    api_key: apiKey,
    api_secret: apiSecret
} );

interface CloudinaryResponse
{
    secure_url: string;
    public_id: string;
}

const uploadImage = async ( imagePath: string ): Promise<CloudinaryResponse | null> =>
{

    try
    {

        const response = await cloudinary.uploader
            .upload( imagePath, {
                resource_type: "auto",
            } )
        fs.unlinkSync( imagePath );
        logger.info( "Image uploaded to Cloudinary", { publicId: response.public_id } );

        return {
            secure_url: response.url,
            public_id: response.public_id
        }

    } catch ( error )
    {
        logger.error( "Cloudinary upload failed", {
            imagePath,
            error: error instanceof Error ? error.message : "Unknown error",
        } );
        if ( imagePath )
        {
            fs.unlinkSync( imagePath ); //remove file if upload file failed
        }
        throw error instanceof Error ? error : new Error( "Something went wrong during image upload" );
        return null

    }
}




const deleteImage = async ( publicId: string ): Promise<void> =>
{
    try
    {
        const result = await cloudinary.uploader.destroy( publicId );

        if ( result.result !== "ok" && result.result !== "not found" )
        {
            throw new Error( `Failed to delete image: ${ result.result }` );
        }

        logger.info( "Image deleted from Cloudinary", {
            publicId,
        } );
    } catch ( error )
    {
        logger.error( "Cloudinary delete failed", {
            publicId,
            error: error instanceof Error ? error.message : "Unknown error",
        } );

        throw error;
    }
};


export { uploadImage, deleteImage }