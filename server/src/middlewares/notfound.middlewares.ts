
import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

//if route not found

const notFound = (
    req: Request,
    res: Response,
    next: NextFunction
) =>
{
    next( new ApiError( 404, `Route ${ req.originalUrl } not found`, [] ) )
}

export { notFound }