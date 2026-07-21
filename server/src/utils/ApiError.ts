
class ApiError extends Error
{
    statusCode: number
    message: string
    success: boolean
    data: null
    error: ( string | object )[]
    stack?: string
    constructor ( statusCode: number, message: string, error: ( string | object )[], stack: string = "" )
    {
        super( message );
        this.statusCode = statusCode
        this.message = message
        this.success = false
        this.data = null
        this.error = error
        if ( stack )
        {
            this.stack = stack
        } else
        {
            Error.captureStackTrace( this, this.constructor )
        }
    }
}

export { ApiError }