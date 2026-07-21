
class ApiResponse
{
    private statusCode: number
    private message: string
    private data: ( string | object )[] | object
    private sucess: boolean
    private error: null
    constructor ( statusCode: number, message: string, data: ( string | object )[] | object )
    {
        this.statusCode = statusCode
        this.sucess = statusCode < 400
        this.message = message
        this.data = data
        this.error = null
    }
}

export { ApiResponse }