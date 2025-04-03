    import { NextFunction, Request, Response } from 'express';

    export const isAuthenticated = (req: Request,res: Response,next: NextFunction) =>{
        if(req.session && req.session.isLoggedIn){
            return next();
        }else {
            return res.status(401).json({ message: "non sei autorizzato"});
        }
    }
        