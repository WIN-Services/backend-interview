import { Request, Response, NextFunction } from 'express';


export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('User Verified')
        //Can add any validation code Ex - JWT auth
        next();
    } catch (error: any) {
        return res.status(401).json({ success: false, msg: error.message });
    }
};

