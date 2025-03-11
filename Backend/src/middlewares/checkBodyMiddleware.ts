import { Request, Response, NextFunction } from "express";

export const checkBodyMiddleWare = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("checkBodyMiddleWare :", req.body);
    if (
        req.body.name ||
        req.body.state ||
        req.body.cityCode ||
        req.body.email
    ) {
        console.log("req.body :", req.body);
        return res.status(400).send({
            statsu: "fail",
            error: "All fields are required.",
        });
    }
    next();
};
