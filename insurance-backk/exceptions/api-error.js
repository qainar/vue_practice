export class ApiError extends Error{
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError(){
        return new ApiError(401, 'Пользователь не зашел')
    }
     static BadRequest(message, errors =[]){
        return new ApiError(400, message, errors)
     }

     static InternalServerError(){
        return new ApiError(500, 'Internal server Error')
     }

     static NotFoundError(message){
        return new ApiError(404, `${message} not found`)
     }
}