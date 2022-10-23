export interface Iuser {
    email: string,
    name: string,
    password: string,
}


export interface CustomRequest {
    user:Iuser,
    file: object,
    params:object,
    query:object,
    path:object,    
}