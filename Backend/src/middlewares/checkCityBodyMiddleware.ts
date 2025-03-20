import { Request, Response, NextFunction } from "express";
const logger = require("../appLogger");

export const checkCityBodyMiddleWare = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.body.name || !req.body.state || !req.body.cityCode) {
        let resObj = {
            status: "fail",
            error: "All fields are required.",
        };
        logger.info(
            `checkCityBodyMiddleWare:req.body:: ${JSON.stringify(req.body)} `
        );
        logger.info(
            `checkCityBodyMiddleWare:resObj:: ${JSON.stringify(resObj)} `
        );
        return res.status(400).send(resObj);
    }
    logger.info(`checkCityBodyMiddleWare:All required field are present`);
    next();
};
