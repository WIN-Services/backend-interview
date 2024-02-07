declare namespace Express {
  export interface Response {
    [key: string]: any
  }
  export interface Request {
    user: any
    file: any
    files: any
  }
}
