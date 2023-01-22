export interface Iuser {
    email: string,
    username: string,
    password: string,
}


export interface CustomRequest {
    user:Iuser,
    file: object,
    params:object,
    query:object,
    path:object,    
}