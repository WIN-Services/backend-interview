class CustomError extends Error{
    constructor(message,errorCode){
        super(message);
        this.code = errorCode;
    }
}

class DatabaseError extends Error{
    constructor(message,databaseErrorCode,queryName){
        super(message);
        this.code = databaseErrorCode;
        this.queryName = queryName
    }
}

module.exports = {
    CustomError,
    DatabaseError
};