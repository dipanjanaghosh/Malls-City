import { Request, Response, NextFunction } from "express";
const logger = require("../appLogger");

export const checkBodyMiddleWare = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (
        req.body.name ||
        req.body.state ||
        req.body.cityCode ||
        req.body.email
    ) {
        let resObj = {
            statsu: "fail",
            error: "All fields are required.",
        };
        logger.info(
            `checkBodyMiddleWare:req.body:: ${JSON.stringify(req.body)} `
        );
        logger.info(`checkBodyMiddleWare:resObj:: ${JSON.stringify(resObj)} `);
        return res.status(400).send(resObj);
    }
    next();
};
